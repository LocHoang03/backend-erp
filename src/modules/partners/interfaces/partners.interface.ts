import { IRolePermission } from 'src/modules/roles/interfaces/role-permission.interface';

export interface IPermission {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  rolePermissions?: IRolePermission[];
}
