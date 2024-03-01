import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { CompaniesModels } from './types';

@ObjectType()
@Schema()
export class Role {
  @Field()
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: CompaniesModels.Company })
  companyId: MongooseSchema.Types.ObjectId;

  static fromDocument({ _id, ...rest }: RoleDocument): Role {
    const role = new Role();
    const id = _id.toString();
    return Object.assign(role, rest, { id });
  }
}
export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
