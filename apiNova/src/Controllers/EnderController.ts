import { IEnderService } from "../services/interfaces/IEnderService";
import { Request, Response } from "express";

export class EnderController {
  constructor(private readonly enderSerivce: IEnderService) {}

  async createEnder(req: Request, res: Response) {
    const idUsuario = req.params.id;
    const { Nome, Cep, Numero, Bairro, Rua, Cidade } = req.body;
    const data = await this.enderSerivce.CreateAddress({
      idUsuario,
      Nome,
      Cep,
      Numero,
      Bairro,
      Rua,
      Cidade,
    });
    return res.json(data).status(200);
  }
  async listarEnder(req: Request, res: Response) {
    const id = req.params.id;
    const data = await this.enderSerivce.FindAllAddress(id);
    return res.send(data).status(200);
  }
  async delEnder(req: Request, res: Response) {
    const id = req.params.id;
    const data = await this.enderSerivce.DeleteAddress(id);
    return res.send(data).status(200);
  }
  async attEnder(req: Request, res: Response) {
    const id = req.params.id;
    const { Nome, Cep, Numero, Bairro, Rua, Cidade } = req.body;
    const data = await this.enderSerivce.UpdateAdress(
      { Nome, Cep, Numero, Bairro, Rua, Cidade },
      id
    );
    return res.send(data).status(200);
  }
  async FindedAddressById(req: Request, res: Response) {
    const id = req.params.id;

    const FindedAddress = await this.enderSerivce.FindedAddressById(id);
    return res.send(FindedAddress).status(200);
  }
}
