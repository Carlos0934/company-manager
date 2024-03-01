import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  companyId: string;
}

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field()
  id: string;
}
