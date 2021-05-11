export const FormModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('Form', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    formDetails: {
      type: DataTypes.JSONTYPE
    }
  })
}