import * as DataLoader from 'dataloader';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesDataloader extends DataLoader<string, Role> {
  constructor(roleService: RoleService) {
    super(async (roleIds) => {
      const roles = await roleService.findByIds(roleIds);

      const result = roleIds.map((roleId) =>
        roles.find((role) => role.id === roleId),
      );

      return result;
    });
  }
}
