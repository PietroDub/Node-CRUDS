export default class UserController {

    async createUser(req, res) {
        const { name, email, password, role } = req.body;
        try {
            const user = await User.create({ name, email, password, role });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        try {
            const user = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}