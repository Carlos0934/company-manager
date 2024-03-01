import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentService } from '../services/department.service';
import { DepartmentResolver } from '../resolvers/department.resolver';
import { Department } from '../models/department.model';

describe('DepartmentResolver', () => {
  let resolver: DepartmentResolver;
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentResolver,
        {
          provide: DepartmentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            getOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<DepartmentResolver>(DepartmentResolver);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('departments', () => {
    it('should return an array of departments', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await resolver.departments()).toBe(result);
    });
  });

  describe('getDepartment', () => {
    it('should return a department', async () => {
      const result = new Department();

      jest.spyOn(service, 'getOne').mockResolvedValue(result);
      expect(await resolver.getDepartment('1')).toBe(result);
    });
  });

  describe('createDepartment', () => {
    it('should create a department', async () => {
      const result = new Department();
      const createDepartmentInput = { name: 'Test', companyId: '1' };
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await resolver.createDepartment(createDepartmentInput)).toBe(
        result,
      );
    });
  });

  describe('updateDepartment', () => {
    it('should update a department', async () => {
      const result = new Department();
      const updateDepartmentInput = { id: '1', name: 'Test', companyId: '1' };
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await resolver.updateDepartment(updateDepartmentInput)).toBe(
        result,
      );
    });
  });

  describe('deleteDepartment', () => {
    it('should delete a department', async () => {
      const result = true;
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await resolver.deleteDepartment('1')).toBe(result);
    });
  });
});
