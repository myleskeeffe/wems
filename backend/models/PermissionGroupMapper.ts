export const PermissionGroupMapperModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('PermissionGroupMapper', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}