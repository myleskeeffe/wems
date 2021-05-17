export const VisitationModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Visitation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    documentName: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATETIME
    }
  })
}