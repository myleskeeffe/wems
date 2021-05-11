export const FormTypeModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('FormType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    format: {
      type: DataTypes.JSONTYPE,
    }
  })
}