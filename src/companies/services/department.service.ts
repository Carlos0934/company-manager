import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from '../models/department.model';
import { Model } from 'mongoose';
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from '../dtos/department.dtos';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async findAll(): Promise<Department[]> {
    const result = await this.departmentModel.find().lean();

    return result.map(Department.fromDocument);
  }

  async findByIds(ids: readonly string[]): Promise<Department[]> {
    const result = await this.departmentModel
      .find({ _id: { $in: ids } })
      .lean();

    return result.map(Department.fromDocument);
  }

  async getOne(id: string): Promise<Department | null> {
    const result = await this.departmentModel.findById(id).lean();
    if (!result) return null;

    return Department.fromDocument(result);
  }

  async create(data: CreateDepartmentInput): Promise<Department> {
    const department = (await this.departmentModel.create(data)).toObject();

    return Department.fromDocument(department);
  }

  async update({ id, ...input }: UpdateDepartmentInput): Promise<Department> {
    const department = await this.departmentModel
      .findByIdAndUpdate(id, input, {
        new: true,
      })
      .lean();

    return Department.fromDocument(department);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.departmentModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
