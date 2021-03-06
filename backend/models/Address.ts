export const AddressModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    streetAddress: {
      type: DataTypes.STRING
    }
  })
}