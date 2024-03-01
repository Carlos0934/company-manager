import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from '../resolvers/role.resolver';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';
import { CreateRoleInput, UpdateRoleInput } from '../dtos/role.dtos';

describe('RoleResolver', () => {
  let roleResolver: RoleResolver;
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: {
            findAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    roleResolver = module.get<RoleResolver>(RoleResolver);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('roles', () => {
    it('should return an array of roles', async () => {
      const roles: Role[] = [
        /* create some test roles here */
      ];
      jest.spyOn(roleService, 'findAll').mockResolvedValue(roles);

      const result = await roleResolver.roles();

      expect(result).toEqual(roles);
    });
  });

  describe('getRole', () => {
    it('should return a role by id', async () => {
      const roleId = '123';
      const role: Role = new Role();
      jest.spyOn(roleService, 'getOne').mockResolvedValue(role);

      const result = await roleResolver.getRole(roleId);

      expect(result).toEqual(role);
    });
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const input = new CreateRoleInput();
      const createdRole: Role = new Role();
      jest.spyOn(roleService, 'create').mockResolvedValue(createdRole);

      const result = await roleResolver.createRole(input);

      expect(result).toEqual(createdRole);
    });
  });

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const input = new UpdateRoleInput();
      const updatedRole = new Role();

      jest.spyOn(roleService, 'update').mockResolvedValue(updatedRole);

      const result = await roleResolver.updateRole(input);

      expect(result).toEqual(updatedRole);
    });
  });

  describe('deleteRole', () => {
    it('should delete a role by id', async () => {
      const roleId = '123';
      const deleted = true;
      jest.spyOn(roleService, 'delete').mockResolvedValue(deleted);

      const result = await roleResolver.deleteRole(roleId);

      expect(result).toEqual(deleted);
    });
  });
});
