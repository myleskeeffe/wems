export const FamilyGuardianMapModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('FamilyGuardianMap', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })
}