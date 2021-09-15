import { FormState } from './form.state';

export interface IProduct {
  id: number | null;
  title: string;
  description: string;
  image: string;
  price: number | null;
}

export interface ProductState extends FormState<IProduct> {
  data: IProduct;
}
