import ActivityDatabaseService from "../../services/ActivityDatabaseService";
import { ActivityModel } from '../../models/ActivityModel';
// import ActivityDatabaseService from "../../services/ActivityDatabaseService";


export class ActivityTypePersistenceInTheDatabase {
    async IsActivityTypeAlreadRegisteredForAnActivity(activityTypeId: number): Promise<boolean> {
        let activityModel: ActivityModel = await ActivityDatabaseService.findActivityWithActivityType(activityTypeId);
        return activityModel != null;
    }
}

export const activityTypePersistenceInTheDatabase = new ActivityTypePersistenceInTheDatabase();