import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenDashboard from './components/screens/ScreenDashboard';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ScreenSettings from './components/screens/ScreenSettings';
import ScreenMoodLogger from './components/screens/widgets/ScreenMoodLogger';
import ScreenLogin from './components/screens/ScreenLogin';
import ScreenSignUp from './components/screens/ScreenSignUp';
import ScreenTodoList from './components/screens/widgets/ScreenTodoList';
import { useState, useEffect } from 'react';
import { colorPalette } from './styles/theme';
import { auth } from './config/firebase';
import './config/firebase';

const Tab = createBottomTabNavigator();

const theme = {
	...DefaultTheme,
	colors: colorPalette,
};

const App = () => {
	const [isSignedIn, setIsSignedIn] = useState(false);

	// listen to login or logout
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setIsSignedIn(user); // true, false
		});
		return unsubscribe; // stop listening
	}, []);

	return (
		// setup react-native-paper and react-navigator context
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Tab.Navigator>
					{isSignedIn ? (
						<>
							<Tab.Screen name='Dashboard' component={ScreenDashboard} />
							<Tab.Screen name='Mood' component={ScreenMoodLogger} />
							<Tab.Screen name='Todo' component={ScreenTodoList} />
							<Tab.Screen name='Settings' component={ScreenSettings} />
						</>
					) : (
						<>
							<Tab.Screen name='Login' component={ScreenLogin} />
							<Tab.Screen name='Sign Up' component={ScreenSignUp} />
						</>
					)}
				</Tab.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
