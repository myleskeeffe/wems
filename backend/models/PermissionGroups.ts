export const PermissionGroupsModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('PermissionGroups', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  })
}