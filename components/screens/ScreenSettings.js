import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

// screens get 'navigation' as prop from context
const ScreenSettings = ({ navigation }) => {
	const [stepCount, setStepCount] = React.useState('');
	const [stepLength, setStepLength] = React.useState('');

	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText} variant='headlineLarge'>
					Settings
				</Text>
			</View>
			<View style={styles.itemContainer}>
				<View style={styles.itemView}>
					<Text style={styles.text} variant='headlineMedium'>
						How many steps would you like to take per day?
					</Text>
					<TextInput
						label='steps'
						style={styles.textInput}
						keyboardType='numeric'
						maxLength={6}
						value={stepCount}
						onChangeText={(stepCount) => setStepCount(stepCount)}
					/>
				</View>
				<View style={styles.itemView}>
					<Text style={styles.text} variant='headlineMedium'>
						How long is your step?
					</Text>
					<TextInput
						label='cm'
						style={styles.textInput}
						keyboardType='numeric'
						maxLength={6}
						value={stepLength}
						onChangeText={(stepLength) => setStepLength(stepLength)}
					/>
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
		flexDirection: 'column',
		backgroundColor: '#85d3c5',
		margin: 5,
		borderRadius: 10,
	},
	text: {
		flex: 8,
		textAlignVertical: 'center',
		paddingLeft: 7,
	},
	textInput: {
		fontSize: 32,
		textAlignVertical: 'center',
		paddingLeft: 7,
	},
	titleText: {
		flex: 8,
		textAlignVertical: 'center',
		paddingLeft: 7,
	},
	titleView: {
		flex: 1,
		flexDirection: 'row',
		margin: 5,
	},
});

export default ScreenSettings;
