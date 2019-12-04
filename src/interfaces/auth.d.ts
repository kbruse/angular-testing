import { Customer } from 'interfaces/customer';

export interface ExternalApiUser {
  uuid: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
}

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  authorities: string[];
  customerAuthData: {
    currentCustomer: Customer;
    availableCustomers: Customer[];
    accessibleCustomerUuids: string[];
  };
}
