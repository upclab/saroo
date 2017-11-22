import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';

import { WHITE, BACKGROUND_DARKER_COLOR } from '@styles/variables';
import utilsStyles from '@styles/utilsStyles';

const SQUARE_SIZE = 48;

export default class UserIconName extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={[styles.square, utilsStyles.flexCentered]}>
          <Icon style={styles.icon} name="md-person" />
        </View>
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
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: BACKGROUND_DARKER_COLOR,
  },
});
