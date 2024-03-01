import { Test, TestingModule } from '@nestjs/testing';

import { CompanyService } from '../services/company.service';
import { CompanyResolver } from '../resolvers/companies.resolver';
import { Company } from '../models/company.model';
import {
  CompanyDepartmentsDataloader,
  CompanyEmployeesDataloader,
  CompanyRolesDataloader,
} from '../dataloaders/company.dataloaders';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyDepartmentsDataloader,
        CompanyEmployeesDataloader,
        CompanyRolesDataloader,
        CompanyResolver,

        {
          provide: CompanyService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            getOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue(true),
            getDepartmentsByCompanyIds: jest.fn().mockResolvedValue([]),
            getEmployeesByCompanyIds: jest.fn().mockResolvedValue([]),
            getRolesByCompanyIds: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('companies', () => {
    it('should return an array of companies', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await resolver.companies()).toBe(result);
    });
  });

  describe('getCompany', () => {
    it('should return a company', async () => {
      const result = new Company();
      jest.spyOn(service, 'getOne').mockResolvedValue(result);
      expect(await resolver.getCompany('1')).toBe(result);
    });
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      const result = new Company();
      const createCompanyInput = {
        name: 'Company',
        description: 'Company description',
        address: 'Company address',
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await resolver.createCompany(createCompanyInput)).toBe(result);
    });
  });

  describe('updateCompany', () => {
    it('should update a company', async () => {
      const result = new Company();
      const updateCompanyInput = {
        id: '1',
        name: 'Company',
        description: 'Company description',
        address: 'Company address',
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await resolver.updateCompany(updateCompanyInput)).toBe(result);
    });
  });

  describe('deleteCompany', () => {
    it('should delete a company', async () => {
      const result = true;
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await resolver.deleteCompany('1')).toBe(result);
    });
  });

  describe('departments', () => {
    it('should return an array of departments', async () => {
      const company = new Company();
      company.id = '1';
      const result = [];

      jest
        .spyOn(service, 'getDepartmentsByCompanyIds')
        .mockResolvedValue(result);
      expect(await resolver.departments(company)).toStrictEqual(result);
    });
  });

  describe('employees', () => {
    it('should return an array of employees', async () => {
      const company = new Company();
      company.id = '1';
      const result = [];

      jest.spyOn(service, 'getEmployeesByCompanyIds').mockResolvedValue(result);
      expect(await resolver.employees(company)).toStrictEqual(result);
    });
  });

  describe('roles', () => {
    it('should return an array of roles', async () => {
      const company = new Company();
      company.id = '1';
      const result = [];

      jest.spyOn(service, 'getRolesByCompanyIds').mockResolvedValue(result);
      expect(await resolver.roles(company)).toStrictEqual(result);
    });
  });
});
