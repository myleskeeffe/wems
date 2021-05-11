export const UserPermissionsModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('UserPermissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}