import { IUserService } from "../services/interfaces/IUserService";
import { Request, Response } from "express";
export class UserController {
  constructor(private readonly userService: IUserService) {}
  async Register(req: Request, res: Response) {
    const { Nome, Email, Senha, cpf, Telefone } = req.body;

    const registeredUser = await this.userService.Register({
      Nome,
      Email,
      Senha,
      cpf,
      Telefone,
    });
    return res.json({ msg: registeredUser });
  }
  async FindUserById(req: Request, res: Response) {
    const id = req.params.id;
    const userFoundOrNot = await this.userService.FindUserById(id);
    return res.json({ userFoundOrNot });
  }
  async UpdateUserById(req: Request, res: Response) {
    const id = req.params.id;
    const { Nome, Telefone } = req.body;
    const updatedUser = await this.userService.UpdateUserById({
      Nome,
      Telefone,
      id,
    });

    return res.json({ updatedUser });
  }
  async DeleteUserAccount(req: Request, res: Response) {
    const id = req.params.id;
    const { Email } = req.body;

    const accountDeleted = await this.userService.DeleteUserAccount({
      Email,
      id,
    });

    return res.json(accountDeleted).status(200);
  }
}
