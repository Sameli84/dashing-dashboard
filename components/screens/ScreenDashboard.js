import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style'; // feel free to add styles
import StepWidget from '../StepLogger/StepWidget';

// screens get 'navigation' as prop from context
const ScreenDashboard = ({ navigation, route }) => {
	const userName = 'Test';
	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText} variant='headlineLarge'>
					Hi, {userName}!
				</Text>
				<Text style={styles.titleText} variant='titleLarge'>
					Widgets:
				</Text>
			</View>
			<View style={styles.itemContainer}>
				<View style={styles.itemView}>
					<Text>Mood</Text>
				</View>
				<View style={styles.itemView}>
					<Text>Todo</Text>
				</View>
				<View style={styles.itemView}>
					<StepWidget navigation={navigation} route={route} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#def9f4',
	},
	itemContainer: {
		flex: 8,
	},
	itemView: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#85d3c5',
		margin: 5,
		borderRadius: 10,
	},
	titleText: {
		flex: 8,
		textAlignVertical: 'center',
		paddingLeft: 7,
	},
	titleView: {
		flex: 1,
		flexDirection: 'column',
		margin: 5,
	},
});

export default ScreenDashboard;
