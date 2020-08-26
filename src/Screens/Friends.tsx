import React, {Component} from 'react';
import Background from '../components/Background';
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import database from '@react-native-firebase/database';
import {theme} from '../core/theme';
import AppModal from '../components/AppModal';

class Friends extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      friendList: [],
      isModalVisible: false,
      name: '',
    };

    this.loadFriends();
  }

  loadFriends = () => {
    database()
      .ref('/users')
      .on('value', (snapshot: any) => {
        let tempArr: Array<any>;
        tempArr = [];
        let obj = snapshot.val();
        for (let key in obj) {
          tempArr.push(obj[key].name);
        }
        this.setState({friendList: tempArr});
      });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  render() {
    return (
      <Background>
        <SafeAreaView>
          <FlatList
            style={{
              width: Dimensions.get('window').width,
            }}
            data={this.state.friendList.filter(this.onlyUnique)}
            extraData={this.state.friendList}
            numColumns={3}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  margin: 5,
                }}
                onPress={() =>
                  this.setState({isModalVisible: true, name: item.name})
                }>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.colors.primary,
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    {item[0]}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <Text>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => 'key' + index}
          />
          <AppModal
            name={this.state.name}
            isVisible={this.state.isModalVisible}
            onDismiss={() =>
              this.setState({isModalVisible: !this.state.isModalVisible})
            }
          />
        </SafeAreaView>
      </Background>
    );
  }
}

export default Friends;
