import { DatabaseConnection } from "../database/DatabaseConnection";
import { ActivityModel } from '../models/ActivityModel';
import { SQLError } from 'expo-sqlite';

const table = 'Activity'
const database = DatabaseConnection.getConnection();

export default class ActivityDatabaseService {
    static findActivityWithActivityType(activityTypeId: number): Promise<ActivityModel> {
        return new Promise((resolve, reject) => database.transaction(command => {
            command.executeSql(`select * from ${table} where activityType = ? limit 1`, [activityTypeId],
                (commandTransaction, resultSet) => {
                    let id: number = resultSet.rows.item(0).id;
                    let activityDescription: string = resultSet.rows.item(0).activityDescription;
                    let activityType = resultSet.rows.item(0).activityType;
                    let activityPremise = resultSet.rows.item(0).activityPremise;
                    let committalDate = resultSet.rows.item(0).committalDate;
                    let committalHour = resultSet.rows.item(0).committalHour;
                    let activityStatus = resultSet.rows.item(0).activityStatus;
                    let activityModel: ActivityModel = new ActivityModel(id, activityDescription, activityType, activityPremise, committalDate, committalHour, activityStatus);

                    resolve(activityModel);
                }), (sqlError: SQLError) => {
                    console.log(sqlError);
                }
        }, (commandError: SQLError) => {
            console.log(commandError);
        }))
    }
}