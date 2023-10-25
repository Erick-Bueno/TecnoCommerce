import { Request, Response } from "express";
import { IPedidoService } from "../services/interfaces/IPedidoService";
export class PedidoController {
  constructor(private readonly pedidoService: IPedidoService) {}
  async createOrder(req: Request, res: Response) {
    const pedido = req.body;

    const processOrder = await this.pedidoService.processOrder(pedido);
    return res.json(processOrder);
  }
  async listOrder(req: Request, res: Response) {
    const id = req.params.id;
    const listOrder = await this.pedidoService.listOrders(id);
    return res.json(listOrder);
  }
  async listOrderProducts(req: Request, res: Response) {
    const codeOrder = req.params.id;
    const listOrderProducts = await this.pedidoService.toListOrderProducts(codeOrder);
    return res.send(listOrderProducts)
  }
}
