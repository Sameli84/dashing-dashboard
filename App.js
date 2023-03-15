import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenDashboard from './components/screens/ScreenDashboard';
import { Provider as PaperProvider } from 'react-native-paper';
import ScreenSettings from './components/screens/ScreenSettings';
import ScreenMoodLogger from './components/screens/widgets/ScreenMoodLogger';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // setup react-native-paper and react-navigator context
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Dashboard' component={ScreenDashboard} />
          <Tab.Screen name='Mood' component={ScreenMoodLogger} />
          <Tab.Screen name='Settings' component={ScreenSettings} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
