export const AddressSuburbStreetModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressSuburbStreet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })
}