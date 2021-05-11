export const AddressCountryModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressCountry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    countryName: {
      type: DataTypes.STRING
    }
  })
}