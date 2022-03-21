import * as sqlite from "expo-sqlite";

export function getDbConnection() {
    const cx = sqlite.openDatabase('dbAtividade2.db');
    return cx;
}


export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbAtividade
        (
            id text not null primary key,
            descricao text not null,
            local text not null,
            tipoAtividade text not null,
            data text not null,
            statusAtividade text not null            
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(
            (tx) => tx.executeSql(query, [],
                (tx, resultado) => resolve(true)
            )
            ,
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};
export function GetAllActivities() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbAtividade';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao,
                            local: registros.rows.item(n).local,
                            tipoAtividade: registros.rows.item(n).tipoAtividade,
                            data: registros.rows.item(n).data,
                            statusAtividade: registros.rows.item(n).statusAtividade
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function insertActivity(atividade: { id: string | number; descricao: string | number; local: string | number; tipoAtividade: string | number; data: string | number; statusAtividade: string | number; }) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbAtividade (id, descricao, local,tipoAtividade,data,statusAtividade) values (?,?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.id, atividade.descricao, atividade.local, atividade.tipoAtividade, atividade.data, atividade.statusAtividade],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {

                resolve(false);
            }
        )
    }
    );
}


export function updateActivity(atividade: { id: string | number; descricao: string | number; local: string | number; tipoAtividade: string | number; data: string | number; statusAtividade: string | number; }) {
    console.log('começando o método updateActivity');
    return new Promise((resolve, reject) => {
        let query = 'update tbAtividade set local=?,tipoAtividade=?,data=?,statusAtividade=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.id, atividade.local, atividade.tipoAtividade, atividade.data, atividade.statusAtividade],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function deleteActivity(id: string) {
    console.log('Apagando Atividade ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbAtividade where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function getActivityById(id: string) {
    console.log("idMetodo" + id);


    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbAtividade where id=?';
            tx.executeSql(query, [id],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao,
                            local: registros.rows.item(n).local,
                            tipoAtividade: registros.rows.item(n).tipoAtividade,
                            data: registros.rows.item(n).data,
                            statusAtividade: registros.rows.item(n).statusAtividade
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}