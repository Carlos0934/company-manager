import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../models/role.model';
import { Model } from 'mongoose';
import { CreateRoleInput, UpdateRoleInput } from '../dtos/role.dtos';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async findAll(): Promise<Role[]> {
    const result = await this.roleModel.find().lean();

    return result.map(Role.fromDocument);
  }

  async getOne(id: string): Promise<Role | null> {
    const result = await this.roleModel.findById(id).lean();
    if (!result) return null;

    return Role.fromDocument(result);
  }

  async findByIds(ids: readonly string[]): Promise<Role[]> {
    const result = await this.roleModel.find({ _id: { $in: ids } }).lean();
    if (!result) return null;

    return result.map(Role.fromDocument);
  }

  async create(data: CreateRoleInput): Promise<Role> {
    const newRole = (await this.roleModel.create(data)).toObject();

    return Role.fromDocument(newRole);
  }

  async update({ id, ...input }: UpdateRoleInput): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(id, input, {
        new: true,
      })
      .lean();

    return Role.fromDocument(role);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.roleModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
