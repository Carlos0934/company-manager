import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { CreateCompanyInput, UpdateCompanyInput } from '../dtos/company.dtos';

import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import {
  CompanyDepartmentsDataloader,
  CompanyEmployeesDataloader,
  CompanyRolesDataloader,
} from '../dataloaders/company.dataloaders';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly departmentsLoader: CompanyDepartmentsDataloader,
    private readonly employeesLoader: CompanyEmployeesDataloader,
    private readonly rolesLoader: CompanyRolesDataloader,
  ) {}

  @Query(() => [Company])
  async companies(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Query(() => Company)
  async getCompany(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company | null> {
    return this.companyService.getOne(id);
  }

  @ResolveField(() => [Department])
  async departments(@Parent() { id }: Company) {
    return this.departmentsLoader.load(id);
  }

  @ResolveField(() => [Employee])
  async employees(@Parent() { id }: Company) {
    return this.employeesLoader.load(id);
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { id }: Company) {
    return this.rolesLoader.load(id);
  }

  @Mutation(() => Company)
  async createCompany(
    @Args('input') input: CreateCompanyInput,
  ): Promise<Company> {
    return this.companyService.create({ ...input });
  }

  @Mutation(() => Company)
  async updateCompany(
    @Args('input') input: UpdateCompanyInput,
  ): Promise<Company> {
    return this.companyService.update({ ...input });
  }

  @Mutation(() => Boolean)
  async deleteCompany(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.companyService.delete(id);
  }
}
