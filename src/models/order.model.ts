import { FormState } from './form.state';

export interface IOrder {
  id: number;
  name: string;
  email: string;
  total: number;
  order_items: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  order_id: number;
  product_title: string;
  price: number;
  quantity: number;
  admin_revenue: string;
  ambassador_revenue: string;
}

export interface OrderState extends FormState<IOrder> {
  data: IOrder;
}
