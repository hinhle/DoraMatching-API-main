import { RolesBuilder } from 'nest-access-control';
import { AppResources } from '@/app.roles';
import { Permission } from 'accesscontrol';
import { IJwtUser } from '@/user/dto/jwt-payload-user.dto';

export type Action = 'read' | 'create' | 'update' | 'delete';
export type Possion = 'Any' | 'Own';
export type ReadAny = 'readAny';

export function grantPermission(rolesBuilder: RolesBuilder, resource: AppResources, action: Action, { id, roles }: IJwtUser, creatorId: any): Permission {
    let behavior;

    if (creatorId)
        behavior = `${action}${id === creatorId ? 'Own' : 'Any'}`;
    else behavior = `${action}Any`;

    // let permisson: Permission = rolesBuilder.can(roles).readOwn(resource);

    const permission: Permission = rolesBuilder.can(roles)[behavior + ''](resource);
    return permission;
}