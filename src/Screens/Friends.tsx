import React, {Component} from 'react';
import Background from '../components/Background';
import {Text, FlatList, View, SafeAreaView, Dimensions} from 'react-native';

import database from '@react-native-firebase/database';
import {theme} from '../core/theme';

class Friends extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      friendList: [],
    };

    this.loadFriends();
  }

  loadFriends = () => {
    database()
      .ref('/users')
      .on('value', (snapshot: any) => {
        let obj = snapshot.val();
        for (let key in obj) {
          for (let userKey in obj[key]) {
            this.state.friendList.push({
              name: obj[key][userKey].name,
            });
          }
        }
        this.setState({friendList: this.state.friendList});
        // console.log('User data: ', snapshot.val());
      });
  };

  render() {
    return (
      <Background>
        <SafeAreaView>
          <FlatList
            style={{
              width: Dimensions.get('window').width,
            }}
            data={this.state.friendList}
            extraData={this.state.friendList}
            numColumns={3}
            renderItem={({item}) => (
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  margin: 5,
                }}>
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
                    {item.name[0]}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <Text>{item.name}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => 'key' + index}
          />
        </SafeAreaView>
      </Background>
    );
  }
}

export default Friends;
