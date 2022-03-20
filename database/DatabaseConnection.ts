import * as sqlite from "expo-sqlite";

export const DatabaseConnection = {
    getConnection: () => sqlite.openDatabase("ActivityControlDatabase.db"),
};
