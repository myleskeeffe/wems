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

import { AddressSuburbStreetModel } from './AddressSuburbStreet';
let addressSuburbStreetM = AddressSuburbStreetModel(sequelize, DataTypes);

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

import { WorkPlacementModel } from './WorkPlacement';
let workPlacementM = WorkPlacementModel(sequelize, DataTypes);

import { FamilyStudentMapModel } from './FamilyStudentMap';
let familyStudentMapM = FamilyStudentMapModel(sequelize, DataTypes);

// Create relations between our tables - the ORM auto creates the fields for each association - so we don't manually specify them in the model
userM.hasMany(userPM);
userPM.belongsTo(userM);

permissionsGM.hasMany(userPM);
userPM.belongsTo(permissionsGM);

permissionGMM.belongsTo(permissionsGM);
permissionsGM.hasMany(permissionGMM);

permissionGMM.belongsTo(permissionsM);
permissionsM.hasMany(permissionGMM);

userM.hasMany(familyGuardianMapM);
familyGuardianMapM.belongsTo(userM);

familyGuardianMapM.belongsTo(familyM);
familyM.hasMany(familyGuardianMapM);

familyM.hasMany(familyStudentMapM);
familyStudentMapM.belongsTo(familyM);

familyStudentMapM.belongsTo(userM);
userM.hasMany(familyStudentMapM);

userM.hasMany(cohortMapM);
cohortMapM.belongsTo(userM);

cohortM.hasMany(cohortMapM);
cohortMapM.belongsTo(cohortM);


companyM.hasMany(contactM);
contactM.belongsTo(companyM);

workPlacementM.belongsTo(contactM);
contactM.hasMany(workPlacementM);

userM.hasMany(workPlacementM);
workPlacementM.belongsTo(userM);

companyM.belongsTo(addressM);
addressM.hasMany(companyM);

addressStreetM.hasMany(addressSuburbStreetM);
addressSuburbStreetM.belongsTo(addressStreetM);

addressSuburbStreetM.belongsTo(addressSuburbM);
addressSuburbM.hasMany(addressSuburbStreetM);

addressPostcodeM.hasMany(addressSuburbM);
addressSuburbM.belongsTo(addressPostcodeM);

addressStateM.hasMany(addressPostcodeM);
addressPostcodeM.belongsTo(addressStateM);

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