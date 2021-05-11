export const UserPermissionsModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('UserPermissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    permissionGroups: {
      type: DataTypes.INTEGER
    }
  })
}