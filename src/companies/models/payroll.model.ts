import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Currency } from './types';

export type PayrollDocument = Payroll & Document;

export enum PayrollStatus {
  PENDING = 'PENDING',
  PAID = 'APPROVED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(PayrollStatus, {
  name: 'PayrollStatus',
  description: 'Status of the payroll',
});

@ObjectType()
@Schema()
export class Payroll {
  @Field()
  id: string;

  @Field()
  @Prop({ required: true })
  salary: number;

  @Field(() => Currency)
  @Prop({ required: true, enum: Currency, default: Currency.USD })
  currency: Currency;

  @Field()
  @Prop({ required: true, default: new Date() })
  date: Date;

  @Field(() => PayrollStatus)
  @Prop({
    required: true,
    enums: PayrollStatus,
    default: PayrollStatus.PENDING,
  })
  status: PayrollStatus;

  static fromDocument({ _id, ...rest }: PayrollDocument): Payroll {
    const payroll = new Payroll();
    const id = _id.toString();
    return Object.assign(payroll, rest, { id });
  }
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
