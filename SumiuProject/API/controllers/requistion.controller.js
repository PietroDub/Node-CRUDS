import { argon2d } from "argon2";
import Requisition from "../models/requisition";

export default class RequisitionController {
    static async postRequisition(req, res) {
        const { title, description, dadName, dadDescription, dadAge, dadLastAddress, motherInformation } = req.body;

        if(!title || !description ||!dadName || !dadDescription || !dadAge || !dadLastAddress || !motherInformation){
            return res 
                .status(422)
                .json({message: "All fields are necessary!"});
        }

        try{
            const requisition = new Requisition({
                titulo,
                description,
                dadName,
                dadDescription,
                dadAge,
                dadLastAddress,
                motherInformation
            });

            const newRequisition = await requisition.save();

            return res
                .status(200)
                .json({message: "Requisition sucessfully created!", newRequisition});
        } catch (error) {
            return res.status(500).json({ message: "Error on crating requistion! "});
        }
    }

    static async deleteRequisition(req, res){
        const requisitionId = req.body;

        try{
            const deletedRequisition = await Requisition.findByIdAndDelete(requisitionId);

            if (!deletedRequisition) {
                return res.status(404).json({
                message: "Requisition not found",
                });
            }

            return res.status(200).json({
                message: "Requisition deleted successfully",
            });

        } catch (error){
            return res
                .status(400)
                .json({message: "Error on deleting Requistion!"});
        }
    }

    static async updateRequistion(req, res){
        const requisitionId = req.body;

        try{
            const updatedRequisition = await Requisition.findByIdAndUpdate(requisitionId);

            if(!updatedRequisition){
                return res.status(404).json({
                message: "Requisition not found",
                }); 
            }

            return res
                .status(200)
                .json({message: "Requisition has been updated!", updatedRequisition});
        } catch (error) {
            return res
                .status(400)
                .json({message: "Error on updating Requisition!"});
        }
    }

    static async GetRequistion(req, res){
        const requisitionId = req.body;

        try{
            const requisition = Requisition.findById(requisitionId);

            if(!requisition){
                return res
                    .status(400)
                    .json({message: "Requistion:", requisition});
            }

            return res
                .status(200)
                .json({message: "Requistion:", requisition});

        } catch(error){
            return res
                   .status(500)
                   .json({message: "Requistion not found!"});
        }
    }

    static async getAllRequisitions(req, res){
        try{
            const requisitions = await Requisition.find();
            return res.status(200).json({message: "Requisitions:", requisitions});
        } catch(error){
            return res.status(500).json({message: "Error on getting all requisitions!"});
        }
    }
}