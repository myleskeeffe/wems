export const WorkPlacementModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('WorkPlacement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.DATEONLY
    },
    endDate: {
      type: DataTypes.DATEONLY
    },
    consent: {
      type: DataTypes.BOOLEAN
    },
    approval: {
      type: DataTypes.BOOLEAN
    },
    notes: {
      type: DataTypes.TEXT
    },
    formSubmitted: {
      type: DataTypes.BOOLEAN
    }
  })
}