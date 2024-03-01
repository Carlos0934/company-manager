import { Field, InputType } from '@nestjs/graphql';
import { PayrollStatus } from '../models/payroll.model';
import { Currency } from '../models/types';

@InputType()
export class PayrollInput {
  @Field({ nullable: true, defaultValue: 0 })
  salary: number;

  @Field(() => Currency, { nullable: true })
  currency?: Currency;

  @Field(() => PayrollStatus, { nullable: true })
  status?: PayrollStatus;
}
