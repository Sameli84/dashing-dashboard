import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenDashboard from './components/screens/ScreenDashboard';
import { Provider as PaperProvider } from 'react-native-paper';
import ScreenSettings from './components/screens/ScreenSettings';
import ScreenStepLogger from './components/screens/widgets/ScreenStepLogger';

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		// setup react-native-paper and react-navigator context
		<PaperProvider>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name='Dashboard' component={ScreenDashboard} />
					<Tab.Screen name='StepLogger' component={ScreenStepLogger} />
					<Tab.Screen name='Settings' component={ScreenSettings} />
				</Tab.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
