import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { PRIMARY_COLOR, BACKGROUND_DARKER_COLOR } from '@styles/variables';

export default class Tab extends React.Component {
  render() {
    const { title, isActive, onPress } = this.props;
    return (
      <View style={styles(isActive).container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles(isActive).titleContainer}>
            <Text style={styles(isActive).title}>{title}</Text>
          </View>
        </TouchableWithoutFeedback >
      </View>
    );
  }
}

const styles = isActive => StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    paddingBottom: isActive ? 6 : 8,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: isActive ? 4 : StyleSheet.hairlineWidth,
  },

  title: {
    textAlign: 'center',
    color: isActive ? PRIMARY_COLOR : BACKGROUND_DARKER_COLOR,
    fontWeight: 'bold',
  },
});
