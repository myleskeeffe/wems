export const FormSubmissionModel = function(sequelize: any, DataTypes: any){
  return sequelize.define('FormSubmission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    formData: {
      type: DataTypes.JSON,
    }
  })
}