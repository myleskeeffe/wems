export const AddressPostcodeModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressPostcode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    postcode: {
      type: DataTypes.STRING
    }
  })
}