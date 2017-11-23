import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';

import { WHITE, BACKGROUND_DARKER_COLOR } from '@styles/variables';
import utilsStyles from '@styles/utilsStyles';

const SQUARE_SIZE = 48;

export default class UserAvatar extends React.Component {
  renderUserPhoto() {
    const { photo } = this.props.user;

    if (photo) {
      return <Image source={{ uri: photo }} style={styles.image} />;
    }
    return (
      <View style={[styles.square, utilsStyles.flexCentered]}>
        <Icon style={styles.icon} name="md-person" />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        { this.renderUserPhoto() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: SQUARE_SIZE,
  },

  icon: {
    color: WHITE,
  },

  image: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },

  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: BACKGROUND_DARKER_COLOR,
  },
});
