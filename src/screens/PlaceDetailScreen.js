import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const PlaceDetailScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Información detallada</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default PlaceDetailScreen;
