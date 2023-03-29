import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles/style';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { constants } from '../../styles/style';

export default function ScreenLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLinkPress = () => {
    navigation.navigate('Sign Up');
  };

  // Login, return user etc.
  // onAuthStateChanged in App.js will pick up on this and change navigation
  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User', user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.containerCenterAligned}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
        <Text style={{ textAlign: 'center', marginBottom: constants.SPACER_3 }} variant='headlineLarge'>
          Welcome back!
        </Text>
        <TextInput
          mode='outlined'
          label='E-mail'
          placeholder='Enter your e-mail'
          placeholderTextColor={constants.COLOR_TEXT_PLACEHOLDER}
          onChangeText={(text) => setEmail(text)}
          value={email}
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
          autoCapitalize='none'
          style={{ marginBottom: constants.SPACER_1 }}
          outlineStyle={{ borderRadius: constants.INPUT_BORDER_RADIUS }}
          right={<TextInput.Icon icon='eye' />} // TODO: functionality
          left={<TextInput.Icon icon='lock' />}
        />
        <Button
          style={{
            borderRadius: constants.INPUT_BORDER_RADIUS,
            paddingBottom: constants.SPACER_1,
            paddingTop: constants.SPACER_1,
            marginTop: constants.SPACER_2,
          }}
          mode='contained'
          onPress={() => onLoginPress()}
        >
          Log in
        </Button>
        <View style={{ flex: 1, alignItems: 'center', marginTop: constants.SPACER_3 }}>
          <Text variant='bodyLarge'>
            Don't have an account?{' '}
            <Text onPress={onLinkPress} style={styles.link}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
