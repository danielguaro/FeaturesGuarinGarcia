import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants';
import React from 'react';

const PlaceItem = ({ title, image, personalInformation, onSelect }) => {
	return (
		<TouchableOpacity onPress={() => onSelect()} style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.personalInformation}>{personalInformation}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomColor: COLORS.LIGTH_PINK,
		borderBottomWidth: 2,
		paddingVertical: 10,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 2,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: COLORS.PEACH_PUFF,
	},
	details: {
		marginLeft: 15,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	title: {
		color: COLORS.MAROON,
		fontSize: 18,
		marginBottom: 5,
	},
	personalInformation: {
		color: COLORS.DARK_SIENNA,
		fontSize: 14,
	},
});

export default PlaceItem;
