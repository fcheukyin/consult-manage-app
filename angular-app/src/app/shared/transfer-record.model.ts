import * as moment from 'moment';

export class TransferRecord {
    id: number;
    oldReviewerName: string;
    newReviewerName: string;
    oldGroupName: string;
    newGroupName: string;
    oldUnitName: string;
    newUnitName: string;
    transferDate: string;
    createdAt: string;
    updatedAt: string;

    constructor(record: TransferRecord) {
        this.id = record.id;
        this.oldReviewerName = record.oldReviewerName;
        this.newReviewerName = record.newReviewerName;
        this.oldGroupName = record.oldGroupName;
        this.newGroupName = record.newGroupName;
        this.oldUnitName = record.oldUnitName;
        this.newUnitName = record.newUnitName;
        this.transferDate = moment(record.transferDate).format('YYYY/MM/DD');
    }
}