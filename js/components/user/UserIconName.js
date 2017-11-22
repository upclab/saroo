import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import { WHITE, PRIMARY_COLOR } from '@styles/variables';
import utilsStyles from '@styles/utilsStyles';

const CIRCLE_RADIUS = 24;
const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
  },
  nameWrapper: {
    marginTop: 16,
  },
  name: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  icon: {
    color: WHITE,
  },
  circle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: PRIMARY_COLOR,
  },
});

export default class UserIconName extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={[styles.circle, utilsStyles.flexCentered]}>
          <Icon style={styles.icon} name="md-person" />
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>
            {user.name}
          </Text>
        </View>
      </View>
    );
  }
}
