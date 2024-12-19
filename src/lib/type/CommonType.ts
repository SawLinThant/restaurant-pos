export interface OrderResponse {
  data: {
    Id?: string;
    userId?: string;
    table?: string;
    status?: string;
    orderItems: OrderItem[] | undefined;
    createdDate?: string;
    updatedDate?: string;
  };
}

export interface OrderItem {
  Id: string;
  orderId: string;
  productId: string;
  status: string;
  quantity: number;
  createdDate: string;
  product: Product;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdDate: string;
  updatedDate: string;
  userId: string;
}

export interface PaginationParams {
  take: number;
  skip: number;
}

export interface UserResponse {
  data:{
    id: string
    name: string
    role: string
    email: string
    phone: string
  }
 
}
