export const AddressStreetModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressStreet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    streetName: {
      type: DataTypes.STRING
    }
  })
}