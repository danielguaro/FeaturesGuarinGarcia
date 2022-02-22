import { FlatList, StyleSheet, Text, View } from 'react-native';

import PlaceItem from '../components/PlaceItem/placeItem';
import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as addressAction from '../store/places.actions';

const PlaceListScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const places = useSelector((state) => state.places.places);
	console.warn(places);

	useEffect(() => {
		dispatch(addressAction.loadPlaces());
	}, []);

	const onSelectDetail = () => {
		navigation.navigate('Detalle');
	};

	const renderItem = ({ item }) => (
		<PlaceItem
			title={item.title}
			image={item.image}
			personalInformation="Age, Sex, aditional information"
			onSelect={onSelectDetail}
		/>
	);
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={renderItem}
		>
			<Text>Direcciones</Text>
		</FlatList>
	);
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// });

export default PlaceListScreen;
