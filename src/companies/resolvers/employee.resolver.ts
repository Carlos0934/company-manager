import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../dtos/employee.dtos';
import { Role } from '../models/role.model';
import { RolesDataloader } from '../dataloaders/role.dataloader';
import { Department } from '../models/department.model';
import { DepartmentsDataLoader } from '../dataloaders/department-dataloader';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly rolesDataLoader: RolesDataloader,
    private readonly departmentDataLoader: DepartmentsDataLoader,
  ) {}

  @Query(() => [Employee])
  async employees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Query(() => Employee)
  async getEmployee(@Args('id') id: string): Promise<Employee | null> {
    return this.employeeService.getOne(id);
  }

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() employee: Employee): Promise<Role | null> {
    if (!employee.roleId) return null;

    return this.rolesDataLoader.load(employee.roleId.toString());
  }

  @ResolveField(() => Department, { nullable: true })
  async department(@Parent() employee: Employee): Promise<Department | null> {
    if (!employee.departmentId) return null;

    return this.departmentDataLoader.load(employee.departmentId.toString());
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('input') input: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.create(input);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('input') input: UpdateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteEmployee(@Args('id') id: string): Promise<boolean> {
    return this.employeeService.delete(id);
  }
}
