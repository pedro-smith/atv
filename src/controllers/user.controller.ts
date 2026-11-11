import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers(req.query);
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: "Erro ao deletar usuário" });
    }
  }
}