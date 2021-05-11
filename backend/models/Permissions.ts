export const PermissionsModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    permissionName: {
      type: DataTypes.STRING
    }
  })
}