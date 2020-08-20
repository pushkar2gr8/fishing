import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator, nameValidator} from '../core/utils';

import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {Loader} from '../components/Loader';

const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState({isLoading: false});

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      setLoading({isLoading: true});
      try {
        auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then((res) => {
            AsyncStorage.setItem('firebaseUid', res.user.uid);
            setLoading({isLoading: false});
            navigation.navigate('LoginScreen');
          })
          .catch((err) =>
            auth()
              .createUserWithEmailAndPassword(email.value, password.value)
              .then((res) => {
                AsyncStorage.setItem('firebaseUid', res.user.uid);
                setLoading({isLoading: false});
                navigation.navigate('Dashboard');
              })
              .catch((error) => {
                setLoading({isLoading: false});
                console.log('Error......' + error);
              }),
          );
      } catch (e) {
        setLoading({isLoading: false});
      }
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <Loader isLoading={loading.isLoading} />

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: any) => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: any) => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: any) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {console.log(loading.isLoading)}

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
