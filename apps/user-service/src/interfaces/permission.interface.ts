export interface IPermission {
  id: string;
  key: string; // order.create, product.update
  description?: string;
  created_at?: Date;
}