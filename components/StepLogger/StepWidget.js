import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Pedometer } from 'expo-sensors';

/*
 *
 * Currently the step counter is not updating.
 * Still need to figure out how to get the step count to update.
 *
 * neither default nor custom permission prompt is shown
 * (Android 13) don't know if this is a problem with the app or android
 *
 */

const StepWidget = ({ navigation, route }) => {
	const [stepCount, setStepCount] = useState(0);
	const [isPedometerAvailable, setIsPedometerAvailable] = useState('');

	const requestActivityPermission = async () => {
		console.log(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION));
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION /*, {
				title: 'Activity Recognition Permission',
				message: 'This app needs access to your activity to log your steps.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			}*/
				// ↑"custom" permission prompt
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use activity recognition');
			} else {
				console.log('Activity recognition permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	};

	subscribe = () => {
		// requestActivityPermission();

		const subscription = Pedometer.watchStepCount((result) => {
			setStepCount(result.steps);
		});

		Pedometer.isAvailableAsync().then(
			(result) => {
				setIsPedometerAvailable(String(result));
				// console.log(Pedometer.requestPermissionsAsync());
				// console.log(Pedometer.getPermissionsAsync());
			},
			(error) => {
				setIsPedometerAvailable(error);
			}
		);
	};

	useEffect(() => {
		subscribe();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText} variant='headlineLarge'>
					Step Logger
				</Text>
				<Button style={styles.button} mode='contained' onPress={() => navigation.navigate('StepLogger')}>
					History
				</Button>
				{/* <Button style={styles.button} mode='contained' onPress={requestActivityPermission}>
					Perm
				</Button> */}
				{/* LOG  {"_A": null, "_x": 0, "_y": 0, "_z": null} */}
				{/* LOG  Activity recognition permission denied */}
			</View>
			<View style={styles.itemContainer}>
				<View style={styles.itemView}>
					<Text style={styles.stepText} variant='headlineMedium'>
						Pedometer available: {isPedometerAvailable}
					</Text>
				</View>
				<View style={styles.itemView}>
					<Text style={styles.stepText} variant='headlineMedium'>
						Steps today: {stepCount}
					</Text>
					<Text style={styles.statusText} variant='headlineMedium'>
						x% of daily goal
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		flex: 1,
		fontSize: 27,
		alignContent: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
	},
	itemContainer: {
		flex: 2,
	},
	itemView: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#85d3c5',
		margin: 5,
		borderRadius: 10,
	},
	statusText: {
		flex: 3,
		textAlignVertical: 'center',
	},
	stepText: {
		flex: 5,
		textAlignVertical: 'center',
		padding: 5,
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

export default StepWidget;
