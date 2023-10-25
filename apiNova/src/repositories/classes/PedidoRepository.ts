import { IPedidoRepository } from "../interfaces/IPedidoRepository";
import cliente from "../../../prisma/cliente";

export class PedidoRepository implements IPedidoRepository {
  async deleteOrder(userId: string) {
    const deleteOrder = await cliente.pedido.deleteMany({where:{userId:userId}})
    return true;
  }
  async toListOrderProducts(orderCode: string) {
    const toListOrderProducts = await cliente.pedido.findMany({
      select:{
        date:true, 
        orderNumber:true,
        valorTotal:true,
        valorFrete:true,
        ItemPedido:{
          select:{
            quantity:true,
            produto:{
              select:{
                img:true, 
                NomeProduto:true,
                Preco:true
              }
            }
          }
        }
        
      },
      where:{orderNumber: orderCode}
    
    })

    return toListOrderProducts
  }
  async toListOrder(id_user: string) {
    const listOrder = await cliente.pedido.findMany({where:{userId:id_user}})
    return listOrder
  }
  async deleteFromCart(idUser: string) {
    const deleteFromCart = await cliente.carrinho.deleteMany({where:{id_user:idUser}})
    return deleteFromCart
  }
  async createItemOrder(
    idProduct: string,
    idPedido: string,
    quantity: number,
    valorTotalUnit: number
  ) {
    const newItemOder = await cliente.itemPedido.create({
      data: {
        idProduct: idProduct,
        idPedido: idPedido,
        quantity: quantity,
        valorTotal: valorTotalUnit,
      },
    });
    return newItemOder;
  }
  async createOrder(userId: string, amount: number, priceFrete: number, enderecoId:string) {
    const newOrder = await cliente.pedido.create({
      data: {
        userId:userId,
        valorTotal: amount,
        valorFrete: priceFrete,
        enderecoId: enderecoId
      },
    });
   
    let orderId = newOrder.id;
    return orderId;
  }
}
