import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../models/employee.model';
import { Model } from 'mongoose';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../dtos/employee.dtos';
import { Role, RoleDocument } from '../models/role.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,

    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async findAll(): Promise<Employee[]> {
    const result = await this.employeeModel.find().lean();

    return result.map(Employee.fromDocument);
  }

  async getOne(id: string): Promise<Employee | null> {
    const result = await this.employeeModel.findById(id).lean();
    if (!result) return null;

    return Employee.fromDocument(result);
  }

  async getRole(id: string): Promise<Role | null> {
    const result = await this.roleModel.findById(id).lean();
    if (!result) return null;

    return Role.fromDocument(result);
  }

  async create(data: CreateEmployeeInput): Promise<Employee> {
    const newEmployee = (await this.employeeModel.create(data)).toObject();

    return Employee.fromDocument(newEmployee);
  }

  async update({ id, ...input }: UpdateEmployeeInput): Promise<Employee> {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, input, {
        new: true,
      })
      .lean();

    return Employee.fromDocument(employee);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.employeeModel.deleteOne({ _id: id });

    return result.deletedCount > 0;
  }
}
