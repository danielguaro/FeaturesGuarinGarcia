import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { COLORS } from '../../constants';
import Geolocation from '@react-native-community/geolocation';

const LocationSelector = ({ onLocation }) => {
	const [pickedLocation, setPickedLocation] = useState('');

	const handleGetLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				console.warn(position);
				const { latitude, longitude } = position.coords;
				const location = {
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.0923,
					longitudeDelta: 0.0421,
				};
				setPickedLocation(location);
				onLocation(location);
			},
			(error) => {
				console.warn(error);
				Alert.alert(
					'could not fetch location',
					'Place enable location services and try again',
					[{ text: 'Okay' }]
				);
			},
			{
				enableHighAccuracy: true, //Posición lo mas preciso posible
				timeout: 15000, // TiempoLimite, en caso no traiga la ubicación
				maximumAge: 10000, //Tiempo maximo de la ubicación
				forceRequestLocation: true, //Forzar la consulta de la ubicación
				showLocationDialog: true, //Mostrar dialogo de la ubicación
			}
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.preview}>
				{pickedLocation ? (
					<Text>
						{pickedLocation.latitude},{pickedLocation.longitude}
					</Text>
				) : (
					<Text>No hay una ubicación seleccionada</Text>
				)}
			</View>
			<Button
				title="seleccionar ubicación"
				onPress={handleGetLocation}
				color={COLORS.PEACH_PUFF}
			/>
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
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLORS.BLUSH,
		borderWidth: 1,
	},
});

export default LocationSelector;
