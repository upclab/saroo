import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Bar } from 'react-native-progress';

import toMoney from '@/utilities/money';
import { PRIMARY_COLOR } from '../../styles/variables';

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
    <TouchableOpacity>
      <Text style={saving.savingText}>
        {saving.name}
      </Text>
      <Bar
        color={PRIMARY_COLOR}
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
