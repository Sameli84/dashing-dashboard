import { React, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Button, Dialog, IconButton, List, Portal, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as backend from '../backend/backend';

const TodoWidgetPart = ({ navigation, route }) => {
	const isTodo = route.name == 'Todo';
	const [todoList, setTodoList] = useState([]);
	const [priority, setPriority] = useState(1);
	const [complete, setComplete] = useState(false);
	const [title, setTitle] = useState('');
	const [visible, setVisible] = useState(false);
	const [edit, setEdit] = useState(false);
	const [index, setIndex] = useState(-1);

	const showAddDialog = () => setVisible(true);
	const showEditDialog = () => {
		setEdit(true);
		setVisible(true);
	};
	const hideDialog = () => {
		setEdit(false);
		setVisible(false);
		setIndex(-1);
	};

	const toggleComplete = () => {
		setComplete(!complete);
	};

	const togglePriority = () => {
		if (priority == 3) {
			setPriority(1);
		} else {
			setPriority(priority + 1);
		}
	};

	const updateTodoList = (id, title, complete, priority) => {
		const newTodoList = todoList.map((item) => {
			if (item.id == id) {
				item.title = title;
				item.complete = complete;
				item.priority = priority;
			}
			return item;
		});
		setTodoList(newTodoList);
	};

	const addTodoItem = async (title, complete, priority) => {
		await backend.addTodo({
			Priority: priority,
			Title: title,
		});
		getTodoList();
	};

	const deleteTodoItem = async (index) => {
		await backend.deleteTodo(todoList[index]);
		getTodoList();
	};

	const editTodoItem = async (index, title, complete, priority) => {
		await backend.editTodo(index, undefined, priority, title);
		getTodoList();
	};

	const getTodoList = async () => {
		const todoList = await backend.getTodos();
		setTodoList(todoList);
	};

	useEffect(() => {
		getTodoList();
	}, []);

	return (
		<View style={{ flex: 3 }}>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>{edit ? 'Edit' : 'Add new'} todo item</Dialog.Title>
					<Dialog.Content>
						<TextInput label='Title' value={title} onChangeText={(title) => setTitle(title)} />
						<Text style={{ marginTop: 10 }}>Priority</Text>
						<SegmentedButtons
							value={priority}
							onValueChange={setPriority}
							buttons={[
								{ label: 'High', value: 1 },
								{ label: 'Medium', value: 2 },
								{ label: 'Low', value: 3 },
							]}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Cancel</Button>
						<Button
							onPress={() => {
								{
									edit ? editTodoItem(index, title, complete, priority) : addTodoItem(title, complete, priority);
								}
								hideDialog();
							}}
						>
							{edit ? 'Save' : 'Add'}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
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
						setTitle('');
						setComplete(false);
						setPriority(1);
						showAddDialog();
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
						{todoList.map((item, index) => (
							<List.Item
								key={index}
								style={styles.itemView}
								title={item.Title}
								titleStyle={styles.titleText}
								description={(props) => (
									<View style={{ flexDirection: 'row' }}>
										<IconButton
											{...props}
											icon='pencil-circle-outline'
											size={30}
											onPress={() => {
												setIndex(index);
												setTitle(item.Title);
												setComplete(item.Complete);
												setPriority(item.Priority);
												showEditDialog();
											}}
										/>
										<IconButton
											{...props}
											icon='delete-circle-outline'
											iconColor='red'
											size={30}
											onPress={() => {
												deleteTodoItem(index);
											}}
										/>
									</View>
								)}
								right={(props) => (
									<View style={{ flexDirection: 'row' }}>
										<IconButton
											{...props}
											icon='circle-slice-8'
											iconColor={item.Priority === 1 ? 'red' : item.Priority === 2 ? 'yellow' : 'green'}
											size={40}
											onPress={() => {
												setPriority(item.priority);
												togglePriority();
												//edit todo priority
												updateTodoList(item.id, item.title, item.complete, priority);
												console.log('priority pressed');
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
												updateTodoList(item.id, item.title, complete, item.priority);
												console.log('completion pressed');
											}}
										/>
									</View>
								)}
								onPress={() => {
									ToastAndroid.show(item.Title, ToastAndroid.SHORT);
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
		fontSize: 24,
	},
});

export default TodoWidgetPart;
