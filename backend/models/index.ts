// Import & Setup Sequelize (our ORM)
import { Sequelize, DataTypes } from 'sequelize';

// Initialise DB Connection (could be substituted with PostgreSQL in production)
const sequelize = new Sequelize('sqlite:./database.sqlite3')

// Import models of each table, and then sync it to ensure it is created so we can use it later in the app.
import { UserModel } from './User';
let userM = UserModel(sequelize, DataTypes)
userM.sync();

import { UserPermissionsModel } from './UserPermissions';
let userPM = UserPermissionsModel(sequelize, DataTypes)
userPM.sync();

import { PermissionGroupsModel } from './PermissionGroups';
let permissionsGM = PermissionGroupsModel(sequelize, DataTypes)
permissionsGM.sync();

import { PermissionGroupMapperModel } from './PermissionGroupMapper';
let permissionGMM = PermissionGroupMapperModel(sequelize, DataTypes)
permissionGMM.sync();

import { PermissionsModel } from './Permissions';
let permissionsM = PermissionsModel(sequelize, DataTypes)
permissionsM.sync();

// Export out a series of variables which can be accessed throughout the app
export const db:any = {
  user: userM,
  userPermissions: userPM,
  permissionGroups: permissionsGM,
  permissionGroupMapper: permissionGMM,
  permissions: permissionsM
}