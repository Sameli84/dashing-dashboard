import { React } from 'react';
import { View, StyleSheet } from 'react-native';
import TodoWidgetPart from '../../TodoList/TodoWidgetPart';

const ScreenTodoList = ({ navigation, route }) => {
	return (
		<View style={styles.container}>
			<TodoWidgetPart navigation={navigation} route={route}></TodoWidgetPart>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#def9f4',
	},
});

export default ScreenTodoList;
