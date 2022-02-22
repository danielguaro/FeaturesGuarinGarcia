import RNFS from 'react-native-fs';
import { insertAddress, fetchAddress } from '../db/indexDb';

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACE = 'LOAD_PLACE';

export const addPlace = (title, image) => {
	return async (dispatch) => {
		const fileName = image.split('/').pop();
		const Path = `file:///${RNFS.DocumentDirectoryPath}/${fileName}`;

		try {
			await RNFS.copyFile(image, Path);
			const result = await insertAddress(title, Path, 'Address', 13.4, 10.5);
			console.warn(result);
			dispatch({
				type: ADD_PLACE,
				payload: {
					id: result.insertId,
					title,
					image: Path,
				},
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export const loadPlaces = () => {
	return async (dispatch) => {
		try {
			const places = await fetchAddress();
			dispatch({
				type: LOAD_PLACE,
				payload: places,
			});
		} catch (e) {
			console.warn(e);
		}
	};
};
