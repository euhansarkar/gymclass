"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodGroup = exports.gender = exports.userFilterableFields = exports.userSearchableFields = exports.AdminFilterableFields = exports.AdminRelationalFieldsMapper = exports.AdminRelationalFields = exports.AdminSearchableFields = void 0;
exports.AdminSearchableFields = [];
exports.AdminRelationalFields = [`managementDepartmentId`];
exports.AdminRelationalFieldsMapper = {
    managementDepartment: `managementDepartmentId`,
};
exports.AdminFilterableFields = [`searchTerm`, `gender`, `contactNo`];
exports.userSearchableFields = [`role`];
exports.userFilterableFields = [`searchTerm`, `id`, `role`];
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
