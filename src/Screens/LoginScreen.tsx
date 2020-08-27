import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert, Button,} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button1 from '../components/Button';
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
  const [checked, setChecked] = useState({isChecked: false});

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

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <Background>
      <Logo />

      <Header>P R O F I S H I N G</Header>

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

      <View style={{flexDirection: 'row', width:'100%'}}>
        <View  style={{flexDirection: 'row',width:'50%'}}>
          <CheckBox tintColors={{ true: 'white', false: 'white' }}
            value={checked.isChecked}
            onValueChange={(value) =>
              setChecked({
                isChecked: value,
              })}></CheckBox>
        <Text style={{color: '#fff', }}>Remeber Me</Text>
      </View>
      
        
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          style={{ width:'50%' }}>
          <Text style={{color: '#fff', textAlign:'right'}}>Forgot password</Text>
        </TouchableOpacity>
      
      </View>
      {/* <Button1 mode="contained" onPress={_onLoginPressed}>
        Login
      </Button1> */}
<View style={{ padding: 0, width: 300, }}>
<TouchableOpacity
          onPress={_onLoginPressed}
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            marginTop: 20,
            height: 35
          }}>
          <Text style={{fontSize: 16, marginTop:4, color: '#1D8AB5'}}>Login</Text>
        </TouchableOpacity>
{/* <Button 
            title={'Login'}
            color="#1F81A4"
          onPress={_onLoginPressed}
          /> */}
</View>
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
    color: '#fff',
  },
  link: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default memo(LoginScreen);
