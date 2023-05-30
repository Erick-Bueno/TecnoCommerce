import { IAuthService } from "../services/interfaces/IAuthService";
import { Request, Response } from "express";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}
  async logar(req: Request, res: Response) {
    const { Email, Senha } = req.body;
    const log_User = await this.authService.logar({ Email, Senha });
    return res.json({ msg: log_User });
  }
  verifyTokenJwt(req: Request, res: Response) {
    const jwt = req.body;
    const verifyValidJwt = this.authService.verifyJwt(jwt.jwt);
    console.log(verifyValidJwt);
    return res.json(verifyValidJwt);
  }
}
