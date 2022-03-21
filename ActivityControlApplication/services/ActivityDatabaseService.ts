import { ActivityModel } from '../models/ActivityModel';
import { DatabaseConnection } from '../database/DatabaseConnection';
import DatabaseMigration from "../database/DatabaseMigration";
import ActivityTypeDatabaseService from './ActivityTypeDatabaseService';
import { SQLError } from 'expo-sqlite';

const database = DatabaseConnection.getConnection();

export default class ActivityDatabaseService {
    static async createTable() {
        await new DatabaseMigration;
    }

    static GetPendingActivities(): Promise<ActivityModel[]> {
        return new Promise((resolve, reject) => {
            database.transaction(command => {
                let query = `select *, 
                ActivityType.activityType as activityTypeDescription 
                from Activity 
                inner join ActivityType 
                on ActivityType.id = Activity.activityType 
                where Activity.activityStatus = 1`;

                command.executeSql(query, [],
                    (tx, registros) => {
                        let retorno: ActivityModel[] = [];

                        for (let n = 0; n < registros.rows.length; n++) {
                            let id = registros.rows.item(n).id;
                            let activityDescription = registros.rows.item(n).activityDescription;
                            let activityPremise = registros.rows.item(n).activityPremise;
                            let activityType = registros.rows.item(n).activityType;
                            let committalDate = registros.rows.item(n).committalDate;
                            let committalHour = registros.rows.item(n).committalHour;
                            let activityStatus = registros.rows.item(n).activityStatus;
                            let activityTypeDescription = registros.rows.item(n).activityTypeDescription;
                            let activityModal: ActivityModel = new ActivityModel(id, activityDescription, activityType, activityPremise, committalDate, committalHour, activityStatus, activityTypeDescription);

                            retorno.push(activityModal);
                        }
                        resolve(retorno);
                    }), (sqlError: SQLError) => {
                        console.log(sqlError);
                    }
            }, (error) => {
                console.log(error);
            })
        });
    }

    static GetActivitiesCompleted(): Promise<ActivityModel[]> {
        return new Promise((resolve, reject) => {
            database.transaction(command => {
                let query = `select *, 
                ActivityType.activityType as activityTypeDescription 
                from Activity 
                inner join ActivityType 
                on ActivityType.id = Activity.activityType 
                where Activity.activityStatus = 2`;

                command.executeSql(query, [],
                    (tx, registros) => {
                        let retorno: ActivityModel[] = [];

                        for (let n = 0; n < registros.rows.length; n++) {
                            let id = registros.rows.item(n).id;
                            let activityDescription = registros.rows.item(n).activityDescription;
                            let activityPremise = registros.rows.item(n).activityPremise;
                            let activityType = registros.rows.item(n).activityType;
                            let committalDate = registros.rows.item(n).committalDate;
                            let committalHour = registros.rows.item(n).committalHour;
                            let activityStatus = registros.rows.item(n).activityStatus;
                            let activityTypeDescription = registros.rows.item(n).activityTypeDescription;
                            let activityModal: ActivityModel = new ActivityModel(id, activityDescription, activityType, activityPremise, committalDate, committalHour, activityStatus, activityTypeDescription);

                            retorno.push(activityModal);
                        }
                        resolve(retorno);
                    }), (sqlError: SQLError) => {
                        console.log(sqlError);
                    }
            }, (error) => {
                console.log(error);
            })
        });
    }

    static GetAllActivities(): Promise<ActivityModel[]> {
        return new Promise((resolve, reject) => {
            database.transaction(command => {
                let query = `select *, 
                ActivityType.activityType as activityTypeDescription 
                from Activity 
                inner join ActivityType 
                on ActivityType.id = Activity.activityType`;

                command.executeSql(query, [],
                    (tx, registros) => {
                        let retorno: ActivityModel[] = [];

                        for (let n = 0; n < registros.rows.length; n++) {
                            let id = registros.rows.item(n).id;
                            let activityDescription = registros.rows.item(n).activityDescription;
                            let activityPremise = registros.rows.item(n).activityPremise;
                            let activityType = registros.rows.item(n).activityType;
                            let committalDate = registros.rows.item(n).committalDate;
                            let committalHour = registros.rows.item(n).committalHour;
                            let activityStatus = registros.rows.item(n).activityStatus;
                            let activityTypeDescription = registros.rows.item(n).activityTypeDescription;
                            let activityModal: ActivityModel = new ActivityModel(id, activityDescription, activityType, activityPremise, committalDate, committalHour, activityStatus, activityTypeDescription);

                            retorno.push(activityModal);
                        }
                        resolve(retorno);
                    }), (sqlError: SQLError) => {
                        console.log(sqlError);
                    }
            }, (error) => {
                console.log(error);
            })
        });
    }

    static insertActivity(param: ActivityModel) {
        return new Promise((resolve, reject) => database.transaction(
            command => {
                command.executeSql(`insert into Activity(activityDescription, activityPremise, activityType, committalDate, activityStatus)
                values (?, ?, ?, ?, ?)`,
                    [param.activityDescription, param.activityPremise, param.activityType, param.committalDate, param.activityStatus],
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

    static updateActivity(param: ActivityModel) {
        return new Promise((resolve, reject) => database.transaction(
            command => {
                command.executeSql(`update Activity set activityDescription = ?, activityPremise = ?, activityType = ?, committalDate = ?, activityStatus = ?
                where id = ?`,
                    [param.activityDescription, param.activityPremise, param.activityType, param.committalDate, param.activityStatus, param.id],
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

    static deleteActivity(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            database.transaction(command => {
                command.executeSql(`delete from Activity where id = ?;`, [id], (_, { rowsAffected }) => {
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

    static getActivityById(id: number): Promise<ActivityModel> {
        console.log(`Promise id: ${id}`);
        return new Promise((resolve, reject) => database.transaction(command => {
            command.executeSql(`select * from Activity where id = ?`, [id],
                (commandTransaction, registros) => {
                    let id = registros.rows.item(0).id;
                    let activityDescription = registros.rows.item(0).activityDescription;
                    let activityPremise = registros.rows.item(0).activityPremise;
                    let activityType = registros.rows.item(0).activityType;
                    let committalDate = registros.rows.item(0).committalDate;
                    let committalHour = registros.rows.item(0).committalHour;
                    let activityStatus = registros.rows.item(0).activityStatus;
                    let activityModal: ActivityModel = new ActivityModel(id, activityDescription, activityType, activityPremise, committalDate, committalHour, activityStatus);

                    resolve(activityModal);
                }), (sqlError: SQLError) => {
                    console.log(sqlError);
                }
        }, (commandError: SQLError) => {
            console.log(commandError);
        }))
    }

    static closeActivity(id: number) {
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => database.transaction(
                command => {
                    command.executeSql(`update Activity set activityStatus = 2
                    where id = ?`,
                        [id],
                        (_, { insertId, rows }) => {
                            resolve(insertId);
                        }), (sqlError: SQLError) => {
                            console.log(sqlError);
                        }
                }, (commandError) => {
                    console.log(commandError);
                }
            ));
        })
    }
}