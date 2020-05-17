export class Employee {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    firstnameKana: string;
    lastnameKana: string;
    route: string;
    station: string;
    family: string;
    prefectureId: number;
    directivityId: number;
    directivityName: string;
    charmId: number;
    charmName: String;
    motivationId: number;
    motivationName: String;
    reviewerId: number;
    groupId: number;
    groupName: String;
    unitId: number;
    unitName: String;
    positionId: number;
    positionName: String;
    deletedAt: string
    createdAt: string;
    updatedAt: string;
    lastMeeting: Date;

    constructor (employee: Employee) {
        this.id = employee.id;
        this.name = employee.name;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.firstnameKana = employee.firstnameKana;
        this.lastnameKana = employee.lastnameKana;
        this.route = employee.route;
        this.station = employee.station;
        this.family = employee.family;
        this.prefectureId = employee.prefectureId;
        this.directivityId = employee.directivityId;
        this.directivityName = employee.directivityName;
        this.charmId = employee.charmId;
        this.charmName = employee.charmName;
        this.motivationId = employee.motivationId;
        this.motivationName = employee.motivationName;
        this.reviewerId = employee.reviewerId;
        this.groupId = employee.groupId;
        this.groupName = employee.groupName;
        this.unitId = employee.unitId;
        this.unitName = employee.unitName;
        this.positionId = employee.positionId;
        this.positionName = employee.positionName;
        this.deletedAt = employee.deletedAt;
        this.createdAt = employee.createdAt;
        this.updatedAt = employee.updatedAt;
        this.lastMeeting = employee.lastMeeting;
    }
}