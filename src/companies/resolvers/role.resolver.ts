import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../models/role.model';
import { CreateRoleInput, UpdateRoleInput } from '../dtos/role.dtos';
import { RoleService } from '../services/role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Query(() => Role)
  async getRole(@Args('id') id: string): Promise<Role | null> {
    return this.roleService.getOne(id);
  }

  @Mutation(() => Role)
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    return this.roleService.create(input);
  }

  @Mutation(() => Role)
  async updateRole(@Args('input') input: UpdateRoleInput): Promise<Role> {
    return this.roleService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string): Promise<boolean> {
    return this.roleService.delete(id);
  }
}
