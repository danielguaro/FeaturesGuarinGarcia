import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('address.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL,lng REAL NOT NULL)',
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

// Método para realizar la inserción
export const insertAddress = (title, image, address, lat, lng) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO address (title, image, address, lat, lng) VALUES (?,?,?,?,?);',
				[title, image, address, lat, lng],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});
	return promise;
};

// Metodo para visualizar la info
export const fetchAddress = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM address;',
				[],
				(_, result) => {
					let data = [];
					let len = result.rows.length;
					for (let i = 0; i < len; i++) {
						let row = result.rows.item(i);
						data.push(row);
					}
					resolve(data);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
