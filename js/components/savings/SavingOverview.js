import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Bar } from 'react-native-progress';

import toMoney from '@/utilities/money';
import { PRIMARY_COLOR } from '@styles/variables';

export default class SavingOverview extends React.Component {
  renderTitle() {
    const { saving, hideTitle } = this.props;

    if (!hideTitle) {
      return (
        <Text style={styles.savingText}>
          {saving.name}
        </Text>
      );
    }
    return (null);
  }

  render() {
    const { saving } = this.props;
    return (
      <TouchableOpacity>
        { this.renderTitle() }
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
}

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
    color: PRIMARY_COLOR,
    fontSize: 16,
  },

  progressEnd: {
    flex: 1,
    color: PRIMARY_COLOR,
    fontSize: 16,
    textAlign: 'right',
  },

  savingText: {
    color: PRIMARY_COLOR,
    fontSize: 17,
    fontWeight: '600',
  },
});
