import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURI TEXT NOT NULL, address TEXT NOT NULL, latt REAL NOT NULL, long REAL NOT NULL)',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            })
        })
    })
    return promise;
}

export const insertPlaces = (title, image, address, latt, long) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title, imageURI, address, latt, long) VALUES (?, ?, ?, ?, ?)`,
            [title, image, address, latt, long],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            )
        })
    })
    return promise;
}

export const getPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM places',
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            })
        })
    })
    return promise;
}