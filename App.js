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
import ScreenMoodHistory from './components/screens/widgets/ScreenMoodHistory';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

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

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        MorrisRoman: require('./assets/fonts/MorrisRoman-Black.ttf'),
      }))();
  }, []);

  return (
    // setup react-native-paper and react-navigator context
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              } else if (route.name === 'Mood') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Todo') {
                iconName = focused ? 'checkbox' : 'checkbox-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          {isSignedIn ? (
            <>
              <Tab.Screen name='Dashboard' component={ScreenDashboard} />
              <Tab.Screen name='Mood' component={ScreenMoodLogger} />
              <Tab.Screen name='Todo' component={ScreenTodoList} />
              <Tab.Screen name='Settings' component={ScreenSettings} />
              <Tab.Screen
                name='MoodHistory'
                component={ScreenMoodHistory}
                options={{
                  tabBarButton: () => null,
                  tabBarVisible: false, // if you don't want to see the tab bar
                }}
              />
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
