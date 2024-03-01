import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Company {
  @Field(() => String)
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop()
  description: string;

  @Field(() => String)
  @Prop({ required: true })
  address: string;

  static fromDocument({ _id, ...rest }: CompanyDocument): Company {
    const company = new Company();
    return Object.assign(company, rest, { id: _id });
  }
}
export const CompanySchema = SchemaFactory.createForClass(Company);
export type CompanyDocument = Company & Document;
