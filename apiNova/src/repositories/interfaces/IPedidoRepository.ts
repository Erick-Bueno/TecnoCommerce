export interface IPedidoRepository {
  createOrder(userId: string, amount: number, priceFrete: number,enderecoId:string);
  createItemOrder(idProduct: string, idPedido: string, quantity: number, valorTotalUnit: number)
  deleteFromCart(idUser:string)
  toListOrder(id_user:string)
  toListOrderProducts(orderCode:string)
  deleteOrder(userId:string)
}
