export interface OrderItemDto {
  Id: string;
  productId: string;
  quantity: number;
}

export interface OrderDto {
  orderItems: OrderItemDto[];
  table: string;
  // status: string;
}
