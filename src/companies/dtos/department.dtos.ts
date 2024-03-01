import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  companyId: string;
}

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field()
  id: string;
}
