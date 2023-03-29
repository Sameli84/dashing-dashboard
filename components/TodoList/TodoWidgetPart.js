import { React, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { IconButton, List, Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

// mock data for todo list
const mockTodoList = [
	{
		id: 1,
		title: 'Get up',
		complete: true,
		importance: 1,
	},
	{
		id: 2,
		title: 'Go to work',
		complete: false,
		importance: 2,
	},
	{
		id: 3,
		title: 'Go home',
		complete: true,
		importance: 3,
	},
	{
		id: 4,
		title: 'Get up',
		complete: true,
		importance: 1,
	},
	{
		id: 5,
		title: 'Go to work',
		complete: false,
		importance: 2,
	},
	{
		id: 6,
		title: 'Go homeGo homeGo homeGo home',
		complete: true,
		importance: 3,
	},
	{
		id: 7,
		title: 'Get up',
		complete: true,
		importance: 1,
	},
	{
		id: 8,
		title: 'Go to work',
		complete: false,
		importance: 2,
	},
	{
		id: 9,
		title: 'Go home',
		complete: true,
		importance: 3,
	},
];

const TodoWidgetPart = ({ navigation, route }) => {
	const isTodo = route.name == 'Todo';

	const [todoList, setTodoList] = useState(mockTodoList);
	const [importance, setImportance] = useState(1);
	const [complete, setComplete] = useState(false);

	const toggleComplete = () => {
		setComplete(!complete);
	};

	const toggleImportance = () => {
		if (importance == 3) {
			setImportance(1);
		} else {
			setImportance(importance + 1);
		}
	};

	const updateTodoList = (id, title, complete, importance) => {
		const newTodoList = todoList.map((item) => {
			if (item.id == id) {
				item.title = title;
				item.complete = complete;
				item.importance = importance;
			}
			return item;
		});
		setTodoList(newTodoList);
	};

	const deleteTodoItem = (id) => {
		const newTodoList = todoList.filter((item) => item.id != id);
		setTodoList(newTodoList);
	};

	const addTodoItem = (title, complete, importance) => {
		const newTodoList = [
			...todoList,
			{
				id: todoList.length + 1,
				title: title,
				complete: complete,
				importance: importance,
			},
		];
		setTodoList(newTodoList);
	};

	return (
		<View style={{ flex: 3 }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Text
					style={{ flex: 5, textAlignVertical: 'center', paddingLeft: 7 }}
					variant='headlineLarge'
					onPress={() => {
						if (route.name == 'Dashboard') {
							navigation.navigate('Todo');
						}
					}}
				>
					Todo List
				</Text>
				<Ionicons
					size={58}
					name='add-circle-outline'
					style={{ flex: 1 }}
					title='Add'
					onPress={() => {
						//add new todo item
						addTodoItem(`New Todo`, false, 1);
						console.log('add new todo');
					}}
				></Ionicons>
				{route.name == 'Todo' && (
					<Ionicons
						size={58}
						name='arrow-back-circle-outline'
						style={{ flex: 1 }}
						title='Back'
						onPress={() => {
							if (route.name == 'Todo') {
								navigation.navigate('Dashboard');
							}
						}}
					></Ionicons>
				)}
			</View>

			<View style={[{ flex: 2 }, isTodo && { flex: 9 }]}>
				<List.Section>
					<ScrollView>
						{todoList.map((item) => (
							<List.Item
								key={item.id}
								style={styles.itemView}
								title={item.title}
								titleStyle={styles.titleText}
								description={(props) => (
									<View style={{ flexDirection: 'row' }}>
										<IconButton
											{...props}
											icon='pencil-circle-outline'
											size={30}
											onPress={() => {
												//edit todo title
												console.log('edit pressed');
											}}
										/>
										<IconButton
											{...props}
											icon='delete-circle-outline'
											iconColor='red'
											size={30}
											onPress={() => {
												//delete todo item
												deleteTodoItem(item.id);
												console.log('delete pressed');
											}}
										/>
									</View>
								)}
								right={(props) => (
									<View style={{ flexDirection: 'row' }}>
										<IconButton
											{...props}
											icon='circle-slice-8'
											iconColor={item.importance === 1 ? 'red' : item.importance === 2 ? 'yellow' : 'green'}
											size={40}
											onPress={() => {
												setImportance(item.importance);
												toggleImportance();
												//edit todo importance
												updateTodoList(item.id, item.title, item.complete, importance);
												console.log('importance pressed');
											}}
										/>
										<IconButton
											{...props}
											icon={item.complete ? 'check-circle' : 'circle-outline'}
											iconColor='blue'
											size={40}
											onPress={() => {
												setComplete(item.complete);
												toggleComplete();
												//update todo completion
												updateTodoList(item.id, item.title, complete, item.importance);
												console.log('completion pressed');
											}}
										/>
									</View>
								)}
								onPress={() => {
									console.log('item pressed');
								}}
							/>
						))}
					</ScrollView>
				</List.Section>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	itemView: {
		backgroundColor: '#85d3c5',
		margin: 5,
		borderRadius: 10,
	},
	titleText: {
		fontSize: 28,
	},
});

export default TodoWidgetPart;
