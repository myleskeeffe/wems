export const FamilyStudentMapModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('FamilyStudentMap', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}