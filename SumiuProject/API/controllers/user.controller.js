import User from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export default class UserController {
  static async postUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ message: "todos os campos são obrigatórios!" });
    }

    try {
      const hashPassword = await argon2.hash(password);

      const user = new User({
        name,
        email,
        password: hashPassword,
      });

      const newUser = await user.save();

      return res
        .status(200)
        .json({ message: "User sucessfully created!", newUser});
    } catch (error) {
      return res.status(500).json({ message: "Error on creating user!" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "All fields are necessary. " });
    }

    try {
      const user = await User.findOne({ email }).select(+password);

      if (!user) {
        return res.status(400).json({ message: "Invalid credantials!" });
      }

      const validPassword = await argon2.verify(user.password, password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credantials!" });
      }

      const tokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: process.env.JWT_EXPIRATION_MS || 360000,
      });

      return res.status(200).json({
        message: "Sucessfully login!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json("Error while doing Login:", error);
    }
  }

  static async logout(req, res) {
    try {

      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
      });
            return res.status(200).json({ message: "Logout sucessfully! " });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error while doing logout!", error });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ message: "All fields are necessary. " });
        }
        try {
            const user = await User.findByIdAndUpdate(id, { name, email, password });

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            return res.status(200).json({ message: "User sucessfully updated!", user });
        } catch (error) {
            return res.status(500).json({ message: "Error on updating user!", error });
        }
    }

    
}
