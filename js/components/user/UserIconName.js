import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WHITE, PRIMARY_COLOR } from '@styles/variables';

const styles = StyleSheet.create({
  name: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 12,
  },
  icon: {
    color: WHITE,
  },
});

export default function ({ user }) {
  return (
    <View>
      <Text style={styles.name}>
        {user.name}
      </Text>
    </View>
  );
}
