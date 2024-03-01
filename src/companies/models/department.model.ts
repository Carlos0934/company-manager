import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CompaniesModels } from './types';

@Schema()
@ObjectType()
export class Department {
  @Field(() => String)
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: CompaniesModels.Company })
  companyId: MongooseSchema.Types.ObjectId;

  static fromDocument({ _id, ...rest }: DepartmentDocument): Department {
    const department = new Department();
    const id = _id.toString();

    return Object.assign(department, rest, { id });
  }
}
export type DepartmentDocument = Department & Document;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
