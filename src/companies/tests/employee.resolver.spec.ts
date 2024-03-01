import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResolver } from '../resolvers/employee.resolver';
import { EmployeeService } from '../services/employee.service';
import { RolesDataloader } from '../dataloaders/role.dataloader';
import { DepartmentsDataLoader } from '../dataloaders/department-dataloader';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import { Department } from '../models/department.model';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../dtos/employee.dtos';
import { Types } from 'mongoose';

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;
  let employeeService: EmployeeService;
  let rolesDataLoader: RolesDataloader;
  let departmentDataLoader: DepartmentsDataLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeResolver,
        {
          provide: EmployeeService,
          useValue: {
            findAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: RolesDataloader,
          useValue: {
            load: jest.fn(),
          },
        },
        {
          provide: DepartmentsDataLoader,
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
    employeeService = module.get<EmployeeService>(EmployeeService);
    rolesDataLoader = module.get<RolesDataloader>(RolesDataloader);
    departmentDataLoader = module.get<DepartmentsDataLoader>(
      DepartmentsDataLoader,
    );
  });

  describe('employees', () => {
    it('should return an array of employees', async () => {
      const employees: Employee[] = [
        /* mock employees */
      ];
      jest.spyOn(employeeService, 'findAll').mockResolvedValue(employees);

      const result = await resolver.employees();

      expect(result).toEqual(employees);
    });
  });

  describe('getEmployee', () => {
    it('should return a single employee', async () => {
      const employee: Employee = new Employee();
      jest.spyOn(employeeService, 'getOne').mockResolvedValue(employee);

      const result = await resolver.getEmployee('employeeId');

      expect(result).toEqual(employee);
    });
  });

  describe('role', () => {
    it('should return the role of an employee', async () => {
      const employee: Employee = new Employee();
      employee.roleId = new Types.ObjectId();
      const role: Role = new Role();
      jest.spyOn(rolesDataLoader, 'load').mockResolvedValue(role);

      const result = await resolver.role(employee);

      expect(result).toEqual(role);
    });

    it('should return null if the employee does not have a role', async () => {
      const employee: Employee = new Employee();

      const result = await resolver.role(employee);

      expect(result).toBeNull();
    });
  });

  describe('department', () => {
    it('should return the department of an employee', async () => {
      const employee: Employee = new Employee();
      employee.departmentId = new Types.ObjectId();
      const department: Department = new Department();
      jest.spyOn(departmentDataLoader, 'load').mockResolvedValue(department);

      const result = await resolver.department(employee);

      expect(result).toEqual(department);
    });

    it('should return null if the employee does not have a department', async () => {
      const employee: Employee = new Employee();

      const result = await resolver.department(employee);

      expect(result).toBeNull();
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      const input: CreateEmployeeInput = new CreateEmployeeInput();
      const createdEmployee: Employee = new Employee();
      jest.spyOn(employeeService, 'create').mockResolvedValue(createdEmployee);

      const result = await resolver.createEmployee(input);

      expect(result).toEqual(createdEmployee);
    });
  });

  describe('updateEmployee', () => {
    it('should update an existing employee', async () => {
      const input: UpdateEmployeeInput = new UpdateEmployeeInput();
      const updatedEmployee: Employee = new Employee();
      jest.spyOn(employeeService, 'update').mockResolvedValue(updatedEmployee);

      const result = await resolver.updateEmployee(input);

      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an existing employee', async () => {
      const id = 'employeeId';
      jest.spyOn(employeeService, 'delete').mockResolvedValue(true);

      const result = await resolver.deleteEmployee(id);

      expect(result).toBe(true);
    });
  });
});
