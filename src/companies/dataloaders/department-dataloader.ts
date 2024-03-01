import * as DataLoader from 'dataloader';
import { DepartmentService } from '../services/department.service';

import { Injectable } from '@nestjs/common';
import { Department } from '../models/department.model';

@Injectable()
export class DepartmentsDataLoader extends DataLoader<string, Department> {
  constructor(private readonly deportmentService: DepartmentService) {
    super(async (departmentIds) => {
      const departments = await this.deportmentService.findByIds(departmentIds);

      return departmentIds.map((id) =>
        departments.find((department) => department.id === id),
      );
    });
  }
}
