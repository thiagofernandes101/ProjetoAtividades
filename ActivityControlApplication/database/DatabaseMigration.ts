import { WebSQLDatabase } from "expo-sqlite";
import { DatabaseConnection } from "./DatabaseConnection";

let database: WebSQLDatabase;

export default class DatabaseInitialization {
    constructor() {
        database = DatabaseConnection.getConnection();
        database.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'));
        
        this.InitializeDatabase();
    }

    private async InitializeDatabase() {
        let sqlCommands: string[] = [
            `create table if not exists ActivityType (
                id integer primary key autoincrement,
                activityType text,
                description text
            );`,

            `create table if not exists Activity (
                id integer primary key autoincrement,
                activityDescription text,
                activityType int,
                activityPremise text,
                committalDate text,
                committalHour text,
                activityStatus int,
                foreign key (activityType) references ActivityType (id)
            );`,
        ];

        database.transaction(
            command => {
                for (let index = 0; index < sqlCommands.length; index++) {
                    console.log("execute sql: " + sqlCommands[index]);
                    command.executeSql(sqlCommands[index]);
                }
            }, (error) => {
                console.log("error call back: " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        )
    }
}