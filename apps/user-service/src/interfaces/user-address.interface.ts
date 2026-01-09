export type AddressType = 'home' | 'office' | 'billing';

export interface IUserAddress {
  id: string;
  user_id: string;
  type: AddressType;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
  created_at?: Date;
  updated_at?: Date;
}
