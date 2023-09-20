import * as mongoose from 'mongoose';

export const AssignmentSchema = new mongoose.Schema(
  {
    theAssigned: { type: String, required: true },
    whoAssigns: { type: Array<string>, required: true },
    responsibleForTheAssignment: { type: Array<string>, required: true },
    // administratorWhoAssigns: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'users',
    //   required: false,
    // },
    // administratorWhoAssignsName: { type: String, required: true },
    // employeeWhoAssigns: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'employees',
    //   required: false,
    // },
    // employeeWhoAssignsName: { type: String, required: true },
    // administratorsResponsibleForTheAssigned: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: false,
    //   },
    // ],
    // administratorsResponsibleForTheAssignedNames: {
    //   type: Array<string>,
    //   required: true,
    // },
    // employeesResponsibleForTheAssigned: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'employees',
    //     required: false,
    //   },
    // ],
    // employeesResponsibleForTheAssignedNames: {
    //   type: Array<string>,
    //   required: true,
    // },
  },
  { timestamps: true },
);
