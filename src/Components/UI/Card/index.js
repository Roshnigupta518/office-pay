import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';

const Card = ({children, style, onPress}) => {
  const content = <View style={[styles.container, style]}>{children}</View>;

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }
  return <>{content}</>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    elevation: 10,
  },
});
