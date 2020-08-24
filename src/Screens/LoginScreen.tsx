import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator} from '../core/utils';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Loader} from '../components/Loader';
import database from '@react-native-firebase/database';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState({isLoading: false});

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      setLoading({isLoading: true});
      auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
          AsyncStorage.setItem('firebaseUid', res.user.uid);
          database()
            .ref('/usersInfo/' + res.user.uid)
            .once('value')
            .then(async (snapshot) => {
              for (let key in snapshot.val()) {
                console.log(snapshot.val()[key]);
                AsyncStorage.setItem('name', snapshot.val()[key])
                  .then(() => {
                    setLoading({isLoading: false});
                    navigation.navigate('Dashboard');
                  })
                  .catch((e) => console.log(e));
              }
            });
        })
        .catch((e) => {
          setLoading({isLoading: false});
          Alert.alert('Invalid credentials');
        });
    }
  };

  return (
    <Background>
      <Logo />

      <Header>Profishing</Header>

      <Loader isLoading={loading.isLoading} />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ''})}
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
        onChangeText={(text) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
