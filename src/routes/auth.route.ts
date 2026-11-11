import { AuthController } from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/auth";
import { Router } from "express";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.get("/me", authenticate, authController.me); // Protegida para exigir login

export default router;