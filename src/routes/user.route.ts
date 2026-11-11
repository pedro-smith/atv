import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { UserRole } from "@/types";
import { authenticate, authorize } from "@/middlewares/auth";

const router = Router();
const userController = new UserController();

// Rota pública de cadastro (não leva authenticate nem authorize)
router.post("/", userController.createUser);

// Rotas protegidas: o authorize entra aqui, entre o caminho e o controller
router.get("/", authenticate, authorize([UserRole.Administrador]), userController.getAllUsers);
router.get("/:id", authenticate, authorize([UserRole.Administrador, UserRole.Professor]), userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, authorize([UserRole.Administrador]), userController.deleteUser);

export default router;