import React, {Component} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screens/LoginScreen';
import {
  HomeScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from '../Screens';
import {Avatar} from 'react-native-paper';
import {Image, Text} from 'react-native';
import {theme} from '../core/theme';
import Friends from '../Screens/Friends';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface StackNavigatorProps {
  routeName: string;
}

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName={'Dashboard'}>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused, color}) =>
            focused ? (
              <Text style={{color: theme.colors.primary}}>Home</Text>
            ) : (
              <Text>Home</Text>
            ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{height: 32, width: 32}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
              source={require('../assets/fishingHome.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Friends'}
        component={Friends}
        options={{
          tabBarLabel: ({focused, color}) =>
            focused ? (
              <Text style={{color: theme.colors.primary}}>Friends</Text>
            ) : (
              <Text>Friends</Text>
            ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{height: 32, width: 32}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
              source={require('../assets/friend.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = (props: StackNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName={props.routeName} headerMode="none">
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />

      <Stack.Screen name={'Dashboard'} component={Tabs} />
    </Stack.Navigator>
  );
};

export default AppStack;
