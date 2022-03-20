export class ActivityTypeModel {
    constructor(id: number, activityType: string) {
        this.id = id;
        this.activityType = activityType;
    }

    public id: number;
    public activityType: string;
}