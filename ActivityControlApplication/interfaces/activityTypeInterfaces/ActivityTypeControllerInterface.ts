import { ActivityTypeModel } from "../../models/ActivityTypeModel";

export interface ActivityTypeControllerInterface {
    findAllActivitiesTypes(): Promise<ActivityTypeModel[]>;
    deleteActivityType(id: number): void;
}