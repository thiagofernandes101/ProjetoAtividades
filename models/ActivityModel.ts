export class ActivityModel {
    constructor(id: number, activityDescription: string, activityType: string, activityPremise: string, committalDate: string, committalHour: string, activityStatus: number) {
        this.id = id;
        this.activityDescription = activityDescription;
        this.activityType = activityType;
        this.activityPremise = activityPremise;
        this.committalDate = committalDate;
        this.committalHour = committalHour;
        this.activityStatus = activityStatus;
    }

    public id: number;
    public activityDescription: string;
    public activityType: string;
    public activityPremise: string;
    public committalDate: string;
    public committalHour: string;
    public activityStatus: number;
}