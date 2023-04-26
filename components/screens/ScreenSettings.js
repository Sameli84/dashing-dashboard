import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { auth } from '../../config/firebase';
import style, { constants } from '../../styles/style';
import { StyleSheet } from 'react-native';

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
    <View style={logoutStyle.containerLogout}>
      <View style={logoutStyle.centerAligned}>
        <Text variant='headlineLarge'>Settings</Text>
      </View>
      <View style={logoutStyle.logoutBtn}>
        <Button
          mode='contained'
          onPress={handleLogout}
          style={{
            marginBottom: constants.SPACER_4,
            width: '100%',
          }}
        >
          Log out
        </Button>
      </View>
    </View>
  );
};

const logoutStyle = StyleSheet.create({
  containerLogout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 20,
  },
  centerAligned: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logoutBtn: {
    width: '100%',
  },
});

export default ScreenSettings;
