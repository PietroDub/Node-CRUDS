import { Router } from "express";
import RequisitionController from "../controllers/requistion.controller.js"
const requisitionRoutes = Router();

requisitionRoutes.post("/", RequisitionController.postRequisition);
requisitionRoutes.get("/", RequisitionController.getAllRequisitions);
requisitionRoutes.get("/:id", RequisitionController.getRequistion);
requisitionRoutes.put("/:id", RequisitionController.updateRequistion);
requisitionRoutes.delete("/:id", RequisitionController.deleteRequisition);

export default requisitionRoutes;