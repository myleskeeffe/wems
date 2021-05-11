export const AdressSuburbModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('AddressSuburb', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    suburbName: {
      type: DataTypes.STRING
    }
  })
}