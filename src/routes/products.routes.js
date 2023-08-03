import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller.js";
import { verifyToken, isModerate, isAdmin} from "../middlewares/authJwt.js";

const router = Router();

router.post("/",[verifyToken, isAdmin], createProduct);

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.patch("/:productId",[verifyToken, isModerate], updateProductById);

router.delete("/:productId",[verifyToken, isAdmin], deleteProductById);

export default router;
