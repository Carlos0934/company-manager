import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Payroll, PayrollDocument, PayrollSchema } from './payroll.model';

import { CompaniesModels } from './types';

export type EmployeeDocument = Employee & Document;

@ObjectType()
@Schema()
export class Employee {
  @Field()
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  birthDate: Date;

  @Field()
  @Prop({ required: true, unique: true })
  idNumber: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: CompaniesModels.Company })
  companyId: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: CompaniesModels.Department },
    ],
    default: null,
  })
  departmentId: Types.ObjectId | null;

  @Field(() => String, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: CompaniesModels.Role,
    default: null,
  })
  roleId: Types.ObjectId | null;

  @Field(() => Payroll, { nullable: true })
  @Prop({
    type: PayrollSchema,
    default: null,
  })
  payroll: Payroll | null;

  static fromDocument({ _id, payroll, ...rest }: EmployeeDocument): Employee {
    const employee = new Employee();
    const id = _id.toString();
    if (payroll) {
      employee.payroll = Payroll.fromDocument(payroll as PayrollDocument);
    }
    return Object.assign(employee, rest, { id });
  }
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
