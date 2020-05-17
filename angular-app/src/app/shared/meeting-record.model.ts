export class MeetingRecord {
    id: number;
    employeeName: string;
    employeeId: number;
    reviewerName: string;
    reviewerId: number;
    category: string;
    content: string;
    meetingDate: Date;
    createdAt: string;
    updatedAt: string;

    constructor(record: MeetingRecord) {
        this.id = record.id;
        this.employeeName = record.employeeName;
        this.reviewerName = record.reviewerName;
        this.category = record.category;
        this.content = record.content;
        this.meetingDate = record.meetingDate;
        this.createdAt = record.createdAt;
        this.updatedAt = record.updatedAt;
    }


}