import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import { COLORS } from '../constants';
import ImageSelector from '../components/imageSelector';
import LocationSelector from '../components/LocationSelector/locationSelector';
import { addPlace } from '../store/places.actions';
import { useDispatch } from 'react-redux';

const NewPlaceScreen = ({ navigation }) => {
	const dispatch = useDispatch('');
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [location, setLocation] = useState(null);

	const handleTitleChange = (text) => setTitle(text);

	const handleSave = () => {
		dispatch(addPlace(title, image));
		navigation.navigate('Direcciones');
	};

	const handleOnImage = (uri) => {
		setImage(uri);
	};

	const handleOnLocation = (position) => {
		setLocation(position);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.label}>Foto Personal</Text>
				<ImageSelector onImage={handleOnImage} />
				{/* <LocationSelector onLocation={handleOnLocation} /> */}
				<TextInput
					style={styles.input}
					onChangeText={handleTitleChange}
					value={title}
					placeholder="Ingresa tu nombre y Apellido"
				/>
				<TouchableOpacity style={styles.button} onPress={() => handleSave()}>
					<Text style={styles.text_button}>Guardar Foto</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 28,
		marginVertical: 16,
	},
	label: {
		fontSize: 18,
		marginVertical: 8,
		fontWeight: 'bold',
		color: COLORS.MAROON,
	},
	input: {
		borderBottomColor: COLORS.DARK_SIENNA,
		borderBottomWidth: 1,
		marginVertical: 8,
		padding: 4,
	},
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: COLORS.DARK_SIENNA,
		borderRadius: 20,
		width: 140,
		elevation: 10,
	},
	text_button: {
		alignSelf: 'center',
		color: COLORS.LIGTH_PINK,
		height: 40,
		textAlignVertical: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default NewPlaceScreen;
