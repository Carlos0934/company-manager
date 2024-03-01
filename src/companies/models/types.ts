import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JP',
}

registerEnumType(Currency, {
  name: 'Currency',
  description: 'Currency type',
});

export enum CompaniesModels {
  Company = 'Company',
  Department = 'Department',
  Role = 'Role',
  Employee = 'Employee',
}
