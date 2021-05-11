export const CohortModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Cohort', {
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