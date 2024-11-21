import { SetMetadata } from "@nestjs/common";
import { AvailableRoles } from "../interfaces/roles.enums";

export const Roles = (...roles: AvailableRoles[]) => SetMetadata('roles', roles);