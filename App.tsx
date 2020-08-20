import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppEntry from './src/AppEntry';

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AppEntry />
      </NavigationContainer>
    );
  }
}

export default App;
