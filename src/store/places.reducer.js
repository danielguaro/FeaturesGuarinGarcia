import { ADD_PLACE, LOAD_PLACE } from './places.actions';
import Place from '../models/place';

const initialState = {
	places: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
			const newPlace = new Place(
				//Date.now(), //Lo quitamos,
				action.payload.id,
				action.payload.title,
				action.payload.image
			);
			return {
				...state,
				places: state.places.concat(newPlace),
			};
		case LOAD_PLACE:
			return {
				...state,
				places: action.payload.map(
					(place) => new Place(place.id, place.title, place.image)
				),
			};
		default:
			return state;
	}
};
