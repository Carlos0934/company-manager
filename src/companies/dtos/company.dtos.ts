import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  address: string;
}

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field()
  id: string;
}
