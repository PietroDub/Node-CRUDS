import { Router } from "express";
import RequisitionController from "../controllers/requistion.controller.js"
const requisitionRoutes = Router();

requisitionRoutes.post("/", RequisitionController.postRequisition);
requisitionRoutes.get("/:id", RequisitionController.GetRequistion);
requisitionRoutes.put("/:id", RequisitionController.updateRequistion);
requisitionRoutes.delete("/:id", RequisitionController.deleteRequisition);
requisitionRoutes.get("/", RequisitionController.getAllRequisitions);
requisitionRoutes.get("/:id", RequisitionController.getRequisition);

export default requisitionRoutes;