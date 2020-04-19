export class Reviewer {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    firstnameKana: string;
    lastnameKana: string;
    email: string;
    password: string;
    groupId: number;
    groupName: String;
    unitId: number;
    unitName: String;
    positionId: number;
    positionName: String;
    deletedAt: string
    createdAt: string;
    updatedAt: string;

    constructor (reviewer: Reviewer) {
        this.id = reviewer.id;
        this.name = reviewer.firstName + reviewer.lastName;
        this.firstName = reviewer.firstName;
        this.lastName = reviewer.lastName;
        this.firstnameKana = reviewer.firstnameKana;
        this.lastnameKana = reviewer.lastnameKana;
        this.email = reviewer.email;
        this.password = reviewer.password;
        this.groupId = reviewer.groupId;
        this.groupName = reviewer.groupName;
        this.unitId = reviewer.unitId;
        this.unitName = reviewer.unitName;
        this.positionId = reviewer.positionId;
        this.positionName = reviewer.positionName;
        this.deletedAt = reviewer.deletedAt;
        this.createdAt = reviewer.createdAt;
        this.updatedAt = reviewer.updatedAt;
    }
}