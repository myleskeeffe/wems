export const WorkPlacementModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('WorkPlacement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    consent: {
      type: DataTypes.BOOLEAN
    },
    approval: {
      type: DataTypes.BOOLEAN
    },
    notes: {
      type: DataTypes.TEXT
    }
  })
}