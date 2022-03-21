export class ActivityTypeModel {
    constructor(id: number, activityType: string, description: string) {
        this.id = id;
        this.activityType = activityType;
        this.description = description;
    }

    public id: number;
    public activityType: string;
    public description: string;
}