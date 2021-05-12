// All requests for models come through here first - makes imports much easier, and simplifies model managament.

// Import & Setup Sequelize (our ORM)
import { Sequelize, DataTypes } from 'sequelize';

// Initialise DB Connection (could be substituted with PostgreSQL in production)
const sequelize = new Sequelize('sqlite:./database.sqlite3')

// Import models of each table, and then sync it to ensure it is created so we can use it later in the app.
import { UserModel } from './User';
let userM = UserModel(sequelize, DataTypes)

import { UserPermissionsModel } from './UserPermissions';
let userPM = UserPermissionsModel(sequelize, DataTypes)

import { PermissionGroupsModel } from './PermissionGroups';
let permissionsGM = PermissionGroupsModel(sequelize, DataTypes)

import { PermissionGroupMapperModel } from './PermissionGroupMapper';
let permissionGMM = PermissionGroupMapperModel(sequelize, DataTypes)

import { PermissionsModel } from './Permissions';
let permissionsM = PermissionsModel(sequelize, DataTypes)

import { AddressModel } from './Address';
let addressM = AddressModel(sequelize, DataTypes)

import { AddressCountryModel } from './AddressCountry';
let addressCountryM = AddressCountryModel(sequelize, DataTypes)

import { AddressPostcodeModel } from './AddressPostcode';
let addressPostcodeM = AddressPostcodeModel(sequelize, DataTypes)

import { AddressStateModel } from './AddressState';
let addressStateM = AddressStateModel(sequelize, DataTypes)

import { AddressStreetModel } from './AddressStreet';
let addressStreetM = AddressStreetModel(sequelize, DataTypes)

import { AddressSuburbModel } from './AddressSuburb';
let addressSuburbM = AddressSuburbModel(sequelize, DataTypes)

import { CohortModel } from './Cohort';
let cohortM = CohortModel(sequelize, DataTypes)

import { CohortMapModel } from './CohortMap';
let cohortMapM = CohortMapModel(sequelize, DataTypes)

import { CompanyModel } from './Company';
let companyM = CompanyModel(sequelize, DataTypes)

import { ContactModel } from './Contact';
let contactM = ContactModel(sequelize, DataTypes)

import { FamilyModel } from './Family';
let familyM = FamilyModel(sequelize, DataTypes)

import { FamilyGuardianMapModel } from './FamilyGuardianMap';
let familyGuardianMapM = FamilyGuardianMapModel(sequelize, DataTypes)

import { GuardianModel } from './Guardian';
let guardianM = GuardianModel(sequelize, DataTypes)

import { StudentModel } from './Student';
let studentM = StudentModel(sequelize, DataTypes)

import { WorkPlacementModel } from './WorkPlacement';
let workPlacementM = WorkPlacementModel(sequelize, DataTypes);

import { FormModel } from './Form';
let formM = FormModel(sequelize, DataTypes);

import { FormSubmissionModel } from './FormSubmission';
let formSubmissionM = FormSubmissionModel(sequelize, DataTypes);

import { FormTypeModel } from './FormType';
let formTypeM = FormTypeModel(sequelize, DataTypes);

// Create relations between our tables - the ORM auto creates the fields for each association - so we don't manually specify them in the model
userM.hasMany(userPM);
userPM.belongsTo(userM);

permissionsGM.hasMany(userPM);
userPM.belongsTo(permissionsGM);

permissionGMM.belongsTo(permissionsGM);
permissionsGM.hasMany(permissionGMM);

permissionGMM.belongsTo(permissionsM);
permissionsM.hasMany(permissionGMM);

userM.hasOne(guardianM);
guardianM.belongsTo(userM);

guardianM.hasMany(familyGuardianMapM);
familyGuardianMapM.belongsTo(guardianM);

familyGuardianMapM.belongsTo(familyM);
familyM.hasMany(familyGuardianMapM);

familyM.hasMany(studentM);
studentM.belongsTo(familyM);

studentM.hasMany(cohortMapM);
cohortMapM.belongsTo(studentM);

cohortM.hasMany(cohortMapM);
cohortMapM.belongsTo(cohortM);

formM.hasMany(cohortM);
cohortM.belongsTo(formM);

formM.hasMany(formSubmissionM);
formSubmissionM.belongsTo(formM);

formTypeM.hasMany(formM);
formM.belongsTo(formTypeM);

companyM.hasMany(contactM);
contactM.belongsTo(companyM);

workPlacementM.belongsTo(contactM);
contactM.hasMany(workPlacementM);

studentM.hasMany(workPlacementM);
workPlacementM.belongsTo(studentM);

workPlacementM.belongsTo(formSubmissionM);
formSubmissionM.hasOne(workPlacementM);

companyM.belongsTo(addressM);
addressM.hasMany(companyM);

addressStreetM.hasMany(addressM);
addressM.belongsTo(addressStreetM);

addressSuburbM.hasMany(addressStreetM);
addressStreetM.belongsTo(addressStreetM);

addressPostcodeM.hasMany(addressSuburbM);
addressSuburbM.belongsTo(addressPostcodeM);

addressStateM.hasMany(addressSuburbM);
addressSuburbM.belongsTo(addressStateM);

addressCountryM.hasMany(addressStateM);
addressStateM.belongsTo(addressCountryM);

// Sync all tables with the model
sequelize.sync({alter: true});

// Export out a series of variables which can be accessed throughout the app
export const db:any = {
  user: userM,
  userPermissions: userPM,
  permissionGroups: permissionsGM,
  permissionGroupMapper: permissionGMM,
  permissions: permissionsM,
  address: addressM,
  addressCountry: addressCountryM,
  addressPostcode: addressPostcodeM,
  addressState: addressStateM,
  addressStreet: addressStreetM,
  addressSuburbM: addressSuburbM,
  cohort: cohortM,
  cohortMap: cohortMapM,
  company: companyM,
  contact: contactM,
  family: familyM,
  familyGuardianMap: familyGuardianMapM,
  guardian: guardianM,
  student: studentM,
  workplacement: workPlacementM,
  form: formM,
  formSubmission: formSubmissionM,
  formType: formTypeM,
}