import React, {Component} from 'react';
import Background from '../components/Background';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Avatar, IconButton, Button} from 'react-native-paper';
import {theme} from '../core/theme';
import database from '@react-native-firebase/database';
import {Loader} from '../components/Loader';
import ImagePicker from 'react-native-image-picker';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      feed: [],
      isLoading: false,
      name: '',
    };
    this.loadFriends();
  }

  loadFriends = async () => {
    let tempArr = [];
    this.id = await AsyncStorage.getItem('firebaseUid');
    this.name = await AsyncStorage.getItem('name');
    try {
      this.setState({isLoading: true});
      database()
        .ref('/users')
        .on('value', (snapshot: any) => {
          let obj = snapshot.val();
          for (let key in obj) {
            if (obj[key].image != '') {
              tempArr.push({
                name: obj[key].name,
                image: obj[key].image,
              });
            }
          }
          this.setState({feed: tempArr.reverse()});
          tempArr = [];
        });

      this.setState({isLoading: false});
    } catch (e) {
      this.setState({isLoading: false});
    }
  };

  captureImage = () => {
    try {
      // More info on all the options is below in the API Reference... just some common use cases shown here
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          Alert.alert('unable to access image');
          // console.log('ImagePicker Error: ', response.error);
        } else {
          try {
            this.setState({isLoading: true});
            let random = Math.floor(Math.random() * 90000) + 10000;
            const reference = storage().ref('/images/' + random + '.png');

            const task = reference.putFile(response.uri);

            task.then(async () => {
              const url = await storage()
                .ref('images/' + random + '.png')
                .getDownloadURL();
              this.setState({isLoading: false});

              database().ref('/users/').push().set({
                name: this.name,
                image: url,
              });
            });

            // console.log(url);
          } catch (e) {
            console.log(e);
          }
        }
      });
    } catch (e) {
      this.setState({isLoading: false});
    }
  };

  render() {
    return (
      <Background>
        <Loader isLoading={this.state.isLoading} />
        <SafeAreaView>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text style={{fontSize: 20}}>Fishing gallery</Text>
          </View>
          <FlatList
            style={{
              width: Dimensions.get('window').width,
            }}
            data={this.state.feed}
            extraData={this.state.feed}
            numColumns={2}
            renderItem={({item}) => (
              <Card
                style={{flex: 1, margin: 5}}
                onPress={() =>
                  this.props.navigation.navigate('Details', {
                    name: item.name,
                    url: item.image,
                  })
                }>
                <View
                  style={{
                    height: 40,
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <Avatar.Text
                    style={{marginLeft: 10}}
                    size={25}
                    label={item.name[0]}
                  />
                  <Text style={{margin: 10}}>{item.name}</Text>
                </View>

                <Card.Cover
                  resizeMethod={'resize'}
                  resizeMode={'contain'}
                  source={{uri: item.image}}
                />
              </Card>
            )}
            keyExtractor={(item, index) => 'key' + index}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            position: 'absolute',
            zIndex: 999,
            bottom: 20,
            right: -20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => this.captureImage()}>
          <Text style={{color: '#fff', fontSize: 28}}>+</Text>
        </TouchableOpacity>
      </Background>
    );
  }
}

export default HomeScreen;
