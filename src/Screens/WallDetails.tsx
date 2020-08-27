import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouterConfigOptions} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {Card, Avatar} from 'react-native-paper';
import {theme} from '../core/theme';

interface props {
  navigation: StackNavigationProp<any> & BottomTabNavigationProp<any>;
}

class WallDetails extends Component<props> {
  constructor(props: props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <Background>
        <SafeAreaView
          style={{
            flex: 1,
            width: Dimensions.get('screen').width,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.2}}>
              <BackButton onPress={() => this.props.navigation.goBack()} />
            </View>

            <View style={{flex: 1}}>
              <Card.Title
                title={this.props.route.params.name}
                subtitle={'Texas, Us'}
              />
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Image
              style={{flex: 1}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
              loadingIndicatorSource={require('../assets/loader.png')}
              source={{uri: this.props.route.params.url}}
            />
          </View>
        </SafeAreaView>
      </Background>
    );
  }
}
export default WallDetails;
