import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { auth } from '../../config/firebase';
import style, { constants } from '../../styles/style';

// screens get 'navigation' as prop from context
const ScreenSettings = ({ navigation }) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={style.containerCenterAligned}>
      <Text variant='headlineLarge'>Settings</Text>
      <Text style={{ marginTop: constants.SPACER_3 }}>Debug / settings site for any functions or actions until we define what to do with this Screen</Text>
      <Button mode='contained' onPress={handleLogout} style={{ marginTop: constants.SPACER_3, width: '100%' }}>
        Log out
      </Button>
    </View>
  );
};

export default ScreenSettings;
