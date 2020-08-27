import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './Routers/Routes';

class AppEntry extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <AppStack routeName={'LoginScreen'} />;
  }
}

export default AppEntry;
