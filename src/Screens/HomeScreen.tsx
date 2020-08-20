import React, {Component} from 'react';
import Background from '../components/Background';
import {Text} from 'react-native';

class HomeScreen extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Background>
        <Text>Dashboard</Text>
      </Background>
    );
  }
}

export default HomeScreen;
