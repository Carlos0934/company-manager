import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Department } from '../models/department.model';

import { DepartmentService } from '../services/department.service';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from '../dtos/department.dtos';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => [Department])
  async departments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Query(() => Department, { nullable: true })
  async getDepartment(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Department | null> {
    return this.departmentService.getOne(id);
  }

  @Mutation(() => Department)
  async createDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.create({ ...input });
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('input') input: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteDepartment(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.departmentService.delete(id);
  }
}
