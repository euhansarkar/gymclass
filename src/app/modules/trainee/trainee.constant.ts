export const TraineeSearchableFields = [];

export const TraineeRelationalFields = [`managementDepartmentId`];

export const TraineeRelationalFieldsMapper: { [key: string]: string } = {
    managementDepartment: `managementDepartmentId`,
};

export const TraineeFilterableFields = [`searchTerm`, `gender`, `contactNo`];

export const userSearchableFields: Array<string> = [`role`];
export const userFilterableFields: Array<string> = [`searchTerm`, `id`, `role`];

export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
