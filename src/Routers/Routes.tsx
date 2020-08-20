import React, {Component} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import {
  HomeScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from '../Screens';

const Stack = createStackNavigator();

interface StackNavigatorProps {
  routeName: string;
}

const AppStack = (props: StackNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName={props.routeName} headerMode="none">
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default AppStack;
