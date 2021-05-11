export const AddressStateModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressState', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stateName: {
      type: DataTypes.STRING
    }
  })
}