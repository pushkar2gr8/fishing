import React, {memo} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  onPress: Function;
}

const BackButton = (props: Props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <Image style={styles.image} source={require('../assets/arrow_back.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
