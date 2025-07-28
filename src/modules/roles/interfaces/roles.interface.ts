import { IRolePermission } from './role-permission.interface';

export interface IRole {
  id: number;
  name: string;
  description?: string;
  not_allow_delete: boolean;
  created_at: Date;
  rolePermissions?: IRolePermission[];
}
