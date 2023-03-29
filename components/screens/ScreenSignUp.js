import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles/style';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { constants } from '../../styles/style';

export default function ScreenSignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("The passwords don't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // set display name to the users profile after creating user
        updateProfile(auth.currentUser, {
          displayName: fullName,
        })
          .then(() => {
            console.log('Updated profile succesfully');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.containerCenterAligned}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
        <Text style={{ textAlign: 'center', marginBottom: constants.SPACER_3 }} variant='headlineLarge'>
          Create an account
        </Text>
        <TextInput
          mode='outlined'
          label='Name'
          placeholder='Enter your name'
          placeholderTextColor={constants.COLOR_TEXT_PLACEHOLDER}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          style={{ marginBottom: constants.SPACER_1 }}
          outlineStyle={{ borderRadius: constants.INPUT_BORDER_RADIUS }}
          left={<TextInput.Icon icon='account' />}
        />
        <TextInput
          mode='outlined'
          label='E-mail'
          placeholder='Enter your e-mail'
          placeholderTextColor={constants.COLOR_TEXT_PLACEHOLDER}
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          style={{ marginBottom: constants.SPACER_1 }}
          outlineStyle={{ borderRadius: constants.INPUT_BORDER_RADIUS }}
          left={<TextInput.Icon icon='email' />}
        />
        <TextInput
          mode='outlined'
          label='Password'
          placeholderTextColor={constants.COLOR_TEXT_PLACEHOLDER}
          secureTextEntry
          placeholder='Enter your password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          style={{ marginBottom: constants.SPACER_1 }}
          outlineStyle={{ borderRadius: constants.INPUT_BORDER_RADIUS }}
          right={<TextInput.Icon icon='eye' />} // TODO: functionality
          left={<TextInput.Icon icon='lock' />}
        />
        <TextInput
          mode='outlined'
          label='Confirm password'
          placeholderTextColor={constants.COLOR_TEXT_PLACEHOLDER}
          secureTextEntry
          placeholder='Enter your password again'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          style={{ marginBottom: constants.SPACER_1 }}
          outlineStyle={{ borderRadius: constants.INPUT_BORDER_RADIUS }}
          right={<TextInput.Icon icon='eye' />} // TODO: functionality
          left={<TextInput.Icon icon='lock' />}
        />
        <Button
          style={{ borderRadius: constants.INPUT_BORDER_RADIUS, paddingBottom: 5, paddingTop: 5, marginTop: 10 }}
          mode='contained'
          onPress={() => onRegisterPress()}
        >
          Sign Up
        </Button>
        <View style={{ flex: 1, alignItems: 'center', marginTop: constants.SPACER_3 }}>
          <Text variant='bodyLarge'>
            Already got an account?{' '}
            <Text onPress={onLinkPress} style={styles.link}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
