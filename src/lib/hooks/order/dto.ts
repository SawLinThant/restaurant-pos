export interface OrderItemDto {
    productId: string;
    status: string;
    quantity: number;
  }
  
  export interface OrderDto {
    orderItems: OrderItemDto[];
    table: string;
    status: string;
  }