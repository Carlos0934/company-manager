import * as DataLoader from 'dataloader';
import { CompanyService } from '../services/company.service';
import groupBy from '../utils/groupBy';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyDepartmentsDataloader extends DataLoader<
  string,
  Department[]
> {
  constructor(companyService: CompanyService) {
    super(async (companyIds) => {
      const departments =
        await companyService.getDepartmentsByCompanyIds(companyIds);

      const departmentsByCompanyId = groupBy(departments, 'companyId');

      return companyIds.map((id) => departmentsByCompanyId[id] || []);
    });
  }
}
@Injectable()
export class CompanyEmployeesDataloader extends DataLoader<string, Employee[]> {
  constructor(companyService: CompanyService) {
    super(async (companyIds) => {
      const employees =
        await companyService.getEmployeesByCompanyIds(companyIds);

      const employeesByCompanyId = groupBy(employees, 'companyId');

      return companyIds.map((id) => employeesByCompanyId[id] || []);
    });
  }
}
@Injectable()
export class CompanyRolesDataloader extends DataLoader<string, Role[]> {
  constructor(companyService: CompanyService) {
    super(async (companyIds) => {
      const roles = await companyService.getRolesByCompanyIds(companyIds);

      const rolesByCompanyId = groupBy(roles, 'companyId');

      return companyIds.map((id) => rolesByCompanyId[id] || []);
    });
  }
}
