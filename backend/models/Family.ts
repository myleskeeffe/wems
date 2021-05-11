export const FamilyModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Family', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING
    }
  })
}