import { Field, InputType, PartialType } from '@nestjs/graphql';
import { PayrollInput } from './payroll.dtos';

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  birthDate: Date;

  @Field()
  idNumber: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  departmentId?: string;

  @Field({ nullable: true })
  roleId?: string;

  @Field(() => PayrollInput, { nullable: true })
  payroll?: PayrollInput;

  @Field()
  companyId: string;
}

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field()
  id: string;
}
