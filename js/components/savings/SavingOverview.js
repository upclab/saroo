import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

import toMoney from '@/utilities/money';

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 10,
  },

  progressIndicators: {
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 20,
  },

  progressStart: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },

  progressEnd: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    textAlign: 'right',
  },
});

export default function ({ saving }) {
  return (
    <TouchableOpacity key={saving.name}>
      <Text style={saving.savingText}>
        {saving.name}
      </Text>
      <Progress.Bar
        color="rgb(92, 107, 192)"
        progress={saving.current / saving.meta}
        width={null}
        height={15}
        style={styles.progressBar}
      />
      <View style={styles.progressIndicators}>
        <Text style={styles.progressStart}>{toMoney(saving.current, 'PEN')}</Text>
        <Text style={styles.progressEnd}>{toMoney(saving.meta, 'PEN')}</Text>
      </View>
    </TouchableOpacity>
  );
}
