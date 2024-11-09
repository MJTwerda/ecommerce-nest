import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderDetailsEntity } from "src/OrderDetails/orderDetails.entity";
import { OrderDetailsService } from "src/OrderDetails/orderDetails.service";
import { ProductsService } from "src/Products/products.service";
import { UsersService } from "src/Users/users.service";
import { BaseOrdersDto } from "./dtos/base-orders-dto";
import { OrdersEntity } from "./orders.entity";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly productsService: ProductsService,
  ) {};

  async addOrder(newOrder: BaseOrdersDto): Promise<OrdersEntity> {
    // Validar y obtener usuario
    const foundedUser = await this.usersService.getUserById(newOrder.user);
    if (!foundedUser) {
      throw new NotFoundException(`User with id ${newOrder.user} not found`);
    };

    // Buscar productos y reducir stock de cada uno
    let total: number = 0;
    const selectedProducts = [];

    for (const product of newOrder.products) {
      const foundProduct = await this.productsService.getProductById(product.id);
      if (!foundProduct || foundProduct.stock <= 0) {
        throw new BadRequestException(`Product with id ${product.id} not available`);
      }

      // Reducir el stock y calcular el total
      await this.productsService.reduceStockProduct(foundProduct.id, 1);
      const parsedPrice = Number(foundProduct.price);
      total += parsedPrice;
      selectedProducts.push(foundProduct);
    };

    // Crear y completar la entidad de la orden
    const orderEntity = new OrdersEntity();
    orderEntity.user = foundedUser.id;
    // orderEntity.order_detail = orderDetail;
    orderEntity.date = newOrder.date;

    // Guardar la entidad usando el repositorio
    const savedOrder = await this.ordersRepository.saveOrder(orderEntity);

    // Crear un nuevo detalle de la orden con los productos seleccionados y el total
    const orderDetail = new OrderDetailsEntity();
    orderDetail.price = total; // Asignar el precio total calculado
    orderDetail.products = selectedProducts;
    
    // Guardar el detalle de la orden primero
    const savedOrderDetail = await this.orderDetailsService.createOrderDetail(orderDetail);

    savedOrder.order_detail = savedOrderDetail;
    return await this.ordersRepository.saveOrder(savedOrder);
  };

  async getOrderById(orderId: string) {
    return await this.ordersRepository.getOrderById(orderId);
  };
}