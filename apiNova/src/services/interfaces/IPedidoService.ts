import {PedidoDto} from '../../Dto/PedidoDto'
export interface IPedidoService {
    processOrder(pedido: PedidoDto);
    createOrder(userId: string, amount: number, priceFrete: number,enderecoId:string)
    createItemOrder(idProduct: string, idPedido: string, quantity: number, valorTotalUnit: number)
    listOrders(userId)
    toListOrderProducts(orderCode:string)
}
