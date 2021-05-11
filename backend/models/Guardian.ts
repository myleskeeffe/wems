export const GuardianModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Guardian', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}