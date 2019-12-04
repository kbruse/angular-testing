export interface Customer {
  id: number;
  uuid: string;
  prospective: boolean;
  status: string;
  subCustomers: any[];
  groups: string[];
  color: null;
  logoUrl: null;
  name: string;
}
