export const CohortMapModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('CohortMap', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}