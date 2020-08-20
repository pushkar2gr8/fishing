import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {theme} from '../core/theme';

interface loaderProps {
  isLoading: boolean;
}
export const Loader = (props: loaderProps) => {
  if (props.isLoading) {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          position: 'absolute',
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={theme.colors.primary} />
      </View>
    );
  } else {
    return null;
  }
};
