import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './models/company.model';
import { CompanyService } from './services/company.service';
import { CompanyResolver } from './resolvers/companies.resolver';

import { Department, DepartmentSchema } from './models/department.model';
import { Employee, EmployeeSchema } from './models/employee.model';
import { Role, RoleSchema } from './models/role.model';
import { DepartmentService } from './services/department.service';
import { DepartmentResolver } from './resolvers/department.resolver';
import { EmployeeService } from './services/employee.service';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  CompanyDepartmentsDataloader,
  CompanyEmployeesDataloader,
  CompanyRolesDataloader,
} from './dataloaders/company.dataloaders';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RolesDataloader } from './dataloaders/role.dataloader';
import { DepartmentsDataLoader } from './dataloaders/department-dataloader';

@Module({
  providers: [
    CompanyService,
    CompanyDepartmentsDataloader,
    CompanyEmployeesDataloader,
    CompanyRolesDataloader,
    CompanyResolver,
    DepartmentService,
    DepartmentResolver,
    DepartmentsDataLoader,
    EmployeeService,
    EmployeeResolver,
    RoleService,
    RoleResolver,
    RolesDataloader,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
      },
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class CompaniesModule {}
