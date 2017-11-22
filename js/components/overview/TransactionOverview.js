import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import { inject, observer } from 'mobx-react/native';

import UserAvatar from '@components/user/UserAvatar';

import {
  BACKGROUND_COLOR,
  BACKGROUND_DARKER_COLOR,
  PRIMARY_COLOR,
} from '@styles/variables';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import toMoney from '@utils/money';
import { toDayAndMonths } from '@utils/dates';

function onEdit() {
  Alert.alert('No tienes permisos para editar esta transacción!');
}

@inject('SavingStore')
@observer
export default class TransactionOverview extends React.Component {
  render() {
    const { transaction, SavingStore } = this.props;

    return (
      <View style={componentStyles.wrapper}>
        <View style={utilsStyles.level}>
          <Text style={componentStyles.date}>
            { toDayAndMonths(transaction.date) }
          </Text>
          <Icon
            name="md-create"
            style={styles.icon}
            onPress={() => { onEdit(); }}
          />
        </View>
        <View style={utilsStyles.level}>
          <View style={componentStyles.iconNameSavingContainer}>
            <UserAvatar />
            <View style={styles.flex}>
              <View style={componentStyles.nameSavingContainer}>
                <Text style={componentStyles.name}>
                  {transaction.name}
                </Text>
                <Text style={componentStyles.saving}>
                  { SavingStore.getSavingName(transaction.savingKey) }
                </Text>
              </View>
            </View>
          </View>
          <View style={componentStyles.amountContainer}>
            <Text style={componentStyles.amount}>
              {toMoney(transaction.amount, 'PEN')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const componentStyles = StyleSheet.create({
  wrapper: {
    height: 108,
    backgroundColor: BACKGROUND_COLOR,
    padding: 12,
  },

  iconNameSavingContainer: {
    flexDirection: 'row',
  },

  nameSavingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 8,
  },

  date: {
    color: BACKGROUND_DARKER_COLOR,
    fontWeight: 'bold',
  },

  name: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },

  saving: {
    color: PRIMARY_COLOR,
    fontSize: 12,
  },

  amountContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  amount: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
