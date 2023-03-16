import { React } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { IconButton, Card, Text } from 'react-native-paper';

const ScreenStepLogger = ({ navigation }) => {
	const smiley = '../../../assets/smiley.png';
	const settings = '../../../assets/settings.png';

	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText} variant='headlineLarge'>
					Step Logger
				</Text>
				<View style={styles.imageView}>
					<IconButton icon={require(settings)} size={60} onPress={() => navigation.navigate('Settings')} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					Today
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					1000 steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					Yesterday
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					3500 steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					This week
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					20000 steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					Last week
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					18000 steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					This month
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					80000 steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					This year
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					900k steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
				</View>
			</View>
			<View style={styles.itemView}>
				<Text style={styles.timeText} variant='headlineMedium'>
					Last year
				</Text>
				<Text style={styles.stepText} variant='headlineMedium'>
					890k steps
				</Text>
				<View style={styles.imageView}>
					<Image style={styles.image} source={require(smiley)} />
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
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 15,
		backgroundColor: '#def9f4',
	},
	imageView: {
		flex: 2,
		justifyContent: 'center',
		overflow: 'hidden',
		padding: 2,
	},
	itemView: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#85d3c5',
		margin: 5,
		borderRadius: 10,
	},
	stepText: {
		flex: 3,
		textAlignVertical: 'center',
	},
	timeText: {
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

export default ScreenStepLogger;
