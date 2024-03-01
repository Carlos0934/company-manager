import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Company, CompanyDocument } from '../models/company.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateCompanyInput, UpdateCompanyInput } from '../dtos/company.dtos';
import { Department, DepartmentDocument } from '../models/department.model';
import { Employee, EmployeeDocument } from '../models/employee.model';
import { Role, RoleDocument } from '../models/role.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(): Promise<Company[]> {
    const result = await this.companyModel.find().lean();

    return result.map(Company.fromDocument);
  }

  async getDepartmentsByCompanyIds(
    ids: readonly string[],
  ): Promise<Department[]> {
    const result = await this.departmentModel
      .find({
        companyId: { $in: ids },
      })
      .lean();

    return result.map(Department.fromDocument);
  }

  async getEmployeesByCompanyIds(ids: readonly string[]): Promise<Employee[]> {
    const result = await this.employeeModel
      .find({
        companyId: { $in: ids },
      })
      .lean();

    return result.map(Employee.fromDocument);
  }

  async getRolesByCompanyIds(ids: readonly string[]): Promise<Role[]> {
    const result = await this.roleModel
      .find({
        companyId: { $in: ids },
      })
      .lean();

    return result.map(Role.fromDocument);
  }

  async getOne(id: string): Promise<Company | null> {
    const result = await this.companyModel.findById(id).lean();
    if (!result) return null;

    return Company.fromDocument(result);
  }

  async create(input: CreateCompanyInput): Promise<Company> {
    const doc = (await this.companyModel.create(input)).toObject();

    return Company.fromDocument(doc);
  }

  async update({ id, ...input }: UpdateCompanyInput): Promise<Company> {
    const result = await this.companyModel
      .findByIdAndUpdate(id, input, { new: true })
      .lean();

    return Company.fromDocument(result);
  }

  async delete(id: string): Promise<boolean> {
    const session = await this.connection.startSession();
    let result: boolean;
    try {
      session.startTransaction();

      const results = await Promise.all([
        this.departmentModel.deleteMany({ companyId: id }, { session }).exec(),
        this.employeeModel.deleteMany({ companyId: id }, { session }).exec(),
        this.roleModel.deleteMany({ companyId: id }, { session }).exec(),
        this.companyModel.deleteOne({ _id: id }, { session }).exec(),
      ]);

      await session.commitTransaction();

      result = results.at(-1).deletedCount > 0;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }

    await session.endSession();

    return result;
  }
}
