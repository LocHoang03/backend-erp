import { IPermission } from './../../permissions/interfaces/permissions.interface';
import { IRole } from './roles.interface';

export interface IRolePermission {
  role_id: number;
  permission_id: number;

  role?: IRole;
  permission?: IPermission;
}
