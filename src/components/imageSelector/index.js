import {
	Alert,
	Button,
	Image,
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import React, { useState } from 'react';

import { COLORS } from '../../constants';
import { launchCamera } from 'react-native-image-picker';

const ImageSelector = ({ onImage }) => {
	const [pickerResponse, setPickerResponse] = useState();
	const IS_IOS = Platform.OS === 'ios';

	const handleTakePicture = async () => {
		const options = {
			selectionLimit: 1,
			mediaType: 'photo',
			includeBase64: false,
		};

		let granted;

		if (IS_IOS) {
			granted = await request(PERMISSIONS.IOS.CAMERA);
		} else {
			granted = await request(PERMISSIONS.ANDROID.CAMERA);
		}
		if (granted === RESULTS.GRANTED) {
			launchCamera(options, (res) => {
				if (!res.didCancel && !res.error) {
					setPickerResponse(res.assets[0]);
					onImage && onImage(res.assets[0].uri);
				}
			});
		} else {
			console.warn('Permission denied');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.preview}>
				{!pickerResponse ? (
					<Text>No se ha seleccionado una imagen</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickerResponse.uri }} />
				)}
			</View>
			<TouchableOpacity onPress={handleTakePicture} style={styles.button}>
				<Text style={styles.text_button}>Tomar foto</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	preview: {
		width: '100%',
		height: 220,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.BLUSH,
		borderWidth: 1,
		borderRadius: 50,
	},
	image: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderRadius: 50,
	},
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: COLORS.LIGTH_PINK,
		borderRadius: 20,
		width: 140,
		elevation: 10,
		borderWidth: 1,
		borderColor: COLORS.MAROON,
	},
	text_button: {
		alignSelf: 'center',
		color: COLORS.MAROON,
		height: 40,
		textAlignVertical: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default ImageSelector;
