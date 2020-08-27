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
            numColumns={1}
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
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 10,
                }}
                onPress={() =>
                  this.setState({isModalVisible: true, name: item})
                }>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1D8AB5',
                      margin: 10,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        backgroundColor: '#1D8AB5',
                      }}>
                      {item[0]}
                    </Text>
                  </View>

                  <View style={{flex: 1, height: 40, paddingTop: 5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {item}
                    </Text>
                    <Text style={{fontSize: 12}}>
                      <Text style={{fontWeight: 'bold'}}>Fishing level:</Text>{' '}
                      Pro, <Text style={{fontWeight: 'bold'}}>City:</Text> Texas
                    </Text>
                  </View>
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
