import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Card,
  Avatar,
} from 'react-native-paper';
import {View, Dimensions} from 'react-native';

interface appModalProps {
  name: string;
  isVisible: boolean;
  onDismiss: Function;
}

const AppModal = (props: appModalProps) => {
  return (
    <Provider>
      <Portal>
        <Modal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={props.isVisible}
          onDismiss={props.onDismiss}>
          <View
            style={{
              height: Dimensions.get('window').height / 3.2,
              width: Dimensions.get('window').width / 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <Avatar.Text size={40} label={props.name[0]} />
            <Text style={{fontSize: 16, alignSelf: 'center', marginTop: 10}}>
              {props.name}
            </Text>
            <View
              style={{
                flex: 0.9,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16}}>Fishing level: Pro</Text>
              <Text style={{fontSize: 16}}>From: Texas US</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default AppModal;
