import { PedidoDto } from "../../Dto/PedidoDto";
import { IPedidoRepository } from "../../repositories/interfaces/IPedidoRepository";
import { IPedidoService } from "../interfaces/IPedidoService";

export class PedidoService implements IPedidoService {
  constructor(private readonly pedidoRepository: IPedidoRepository) {}
    async toListOrderProducts(orderCode: string) {
       const listOrderProducts = await this.pedidoRepository.toListOrderProducts(orderCode);
       const newListOrderProducts = listOrderProducts.map(function(i:any){
        return{
          date: i.date, 
          frete:i.valorFrete,
          orderNumber: i.orderNumber,
          valorTotal:Number(i.valorTotal).toLocaleString("pt-br", {style:"currency", currency:"BRL"}),
          produto: i.ItemPedido.map(function(p:any){
            return{
              quantity: Number(p.quantity),
              name: p.produto.NomeProduto,
              img: p.produto.img,
              preco: Number(p.produto.Preco).toLocaleString("pt-br",{style:"currency", currency:"BRL"})
            }
          })
         
        }
       })
       
       return newListOrderProducts;
    }
  async listOrders(userId:string) {
    const listOrder = await this.pedidoRepository.toListOrder(userId);
    return listOrder;
  }
  async createOrder(userId: string, amount: number, priceFrete: number, enderecoId:string) {
    let amountConverted = String(amount)
      .replace(".", "")
      .replace("R$", "")
      .replace(",", ".");

    let priceFreteConverted =
      priceFrete !== null
        ? String(priceFrete)
            .replace(".", "")
            .replace("R$", "")
            .replace(",", ".")
        : 0;
    const newOrderId = await this.pedidoRepository.createOrder(
      userId,
      Number(amountConverted),
      Number(priceFreteConverted),
      enderecoId
    );
    return newOrderId;
  }
  async createItemOrder(
    idProduct: string,
    idPedido: string,
    quantity: number,
    valorTotalUnit: number
  ) {
    let valorTotalUnitConverted = String(valorTotalUnit)
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    const newItemOrder = await this.pedidoRepository.createItemOrder(
      idProduct,
      idPedido,
      quantity,
      Number(valorTotalUnitConverted)
    );
    return newItemOrder;
  }
  async processOrder(pedido: PedidoDto) {
    if (
      pedido.userId == "" ||
      pedido.enderecoId == "" ||
      pedido.totalOrder == 0 ||
      pedido.priceFrete == null ||
      pedido.productData.length <= 0
    ) {
      const responseError = {
        msg: "Erro ao efetuar pedido",
        status: 400,
      };
      return responseError;
    }
    const newOrderId = await this.createOrder(
      pedido.userId,
      pedido.totalOrder,
      pedido.priceFrete,
      pedido.enderecoId
    );
    pedido.productData.forEach(async (data: any) => {
      const newItemPedido = await this.createItemOrder(
        data["id"],
        newOrderId,
        data["Quantidade"],
        data["Total"]
      );
    });
    const deleteFromCart = await this.pedidoRepository.deleteFromCart(
      pedido.userId
    );
    const resp = {
      msg: "Pedido realizado com sucesso",
      status: 200,
    };
    return resp;
  }
}
