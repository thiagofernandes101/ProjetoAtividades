import { ActivityTypeModel } from '../models/ActivityTypeModel';
import { DatabaseConnection } from '../database/DatabaseConnection';
import DatabaseMigration from "../database/DatabaseMigration";
import { SQLError } from 'expo-sqlite';

const table = 'ActivityType';
const database = DatabaseConnection.getConnection();

export default class ActivityTypeDatabaseService {
    static addData(param: ActivityTypeModel) {
        return new Promise((resolve, reject) => database.transaction(
            command => {
                command.executeSql(`insert into ${table}(activityType, description)
                values (?, ?)`,
                    [param.activityType, param.description],
                    (_, { insertId, rows }) => {
                        resolve(insertId);
                    }), (sqlError: SQLError) => {
                        console.log(sqlError);
                    }
            }, (commandError) => {
                console.log(commandError);
            }
        ));
    }

    static updateData(param: ActivityTypeModel) {
        return new Promise((resolve, reject) => database.transaction(
            command => {
                command.executeSql(`update ${table} set activityType = ?, description = ?
                where id = ?`,
                    [param.activityType, param.description, param.id],
                    (_, { insertId, rows }) => {
                        resolve(insertId);
                    }), (sqlError: SQLError) => {
                        console.log(sqlError);
                    }
            }, (commandError) => {
                console.log(commandError);
            }
        ));
    }

    static findAll(): Promise<ActivityTypeModel[]> {
        return new Promise((resolve, reject) => database.transaction(command => {
            command.executeSql(`select * from ${table}`, [],
                (commandTransaction, resultSet) => {
                    let result: ActivityTypeModel[] = [];

                    for (let i = 0; i < resultSet.rows.length; i++) {
                        let id: number = resultSet.rows.item(i).id;
                        let activityType: string = resultSet.rows.item(i).activityType;
                        let description: string = resultSet.rows.item(i).description;
                        let activityTypeModel: ActivityTypeModel = new ActivityTypeModel(id, activityType, description);

                        result.push(activityTypeModel);
                    }

                    resolve(result);
                }), (sqlError: SQLError) => {
                    console.log(sqlError);
                }
        }, (commandError: SQLError) => {
            console.log(commandError);
        }))
    }

    static findById(id: number): Promise<ActivityTypeModel> {
        return new Promise((resolve, reject) => database.transaction(command => {
            command.executeSql(`select * from ${table} where id = ?`, [id],
                (commandTransaction, resultSet) => {
                    let id: number = resultSet.rows.item(0).id;
                    let activityType: string = resultSet.rows.item(0).activityType;
                    let description: string = resultSet.rows.item(0).description;
                    let activityTypeModel: ActivityTypeModel = new ActivityTypeModel(id, activityType, description);

                    resolve(activityTypeModel);
                }), (sqlError: SQLError) => {
                    console.log(sqlError);
                }
        }, (commandError: SQLError) => {
            console.log(commandError);
        }))
    }

    static deleteActivityType(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            database.transaction(command => {
                command.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rowsAffected }) => {
                    resolve(rowsAffected > 0)
                }), (sqlError: SQLError) => {
                    console.log(sqlError);
                    resolve(false);
                }
            }, (txError) => {
                console.log(txError);
                resolve(false);
            });
        })
    }
}