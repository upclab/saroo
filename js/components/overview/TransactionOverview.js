import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import { inject, observer } from 'mobx-react/native';

import UserAvatar from '@components/user/UserAvatar';

import {
  BACKGROUND_COLOR,
  BACKGROUND_DARKER_COLOR,
  DANGER_COLOR,
  PRIMARY_COLOR,
} from '@styles/variables';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import { getOutlayTagName } from '@mobx/transactionStore';

import toMoney from '@utils/money';
import { toDayAndMonths } from '@utils/dates';

function onEdit() {
  Alert.alert('No tienes permisos para editar esta transacción!');
}

@inject('UserStore')
@inject('SavingStore')
@observer
export default class TransactionOverview extends React.Component {
  isOutlay() {
    const { transaction } = this.props;

    if (Number(transaction.amount) < 0) {
      return true;
    }
    return false;
  }

  renderSavingOrOutlayTag() {
    const { SavingStore, transaction } = this.props;
    const isOutlay = this.isOutlay();

    if (isOutlay) {
      return (
        <Text style={componentStyles(isOutlay).outlayTag}>
          { getOutlayTagName(transaction.outlayTagKey) }
        </Text>
      );
    }
    return (
      <Text style={componentStyles(isOutlay).saving}>
        { SavingStore.getSavingName(transaction.savingKey) }
      </Text>
    );
  }

  render() {
    const { transaction, UserStore } = this.props;
    const isOutlay = this.isOutlay();

    return (
      <View
        style={[
          componentStyles(isOutlay).wrapper,
          this.isOutlay() ? componentStyles(isOutlay).outlay : componentStyles(isOutlay).income,
        ]}
      >
        <View style={utilsStyles.level}>
          <Text style={componentStyles(isOutlay).date}>
            { toDayAndMonths(transaction.date) }
          </Text>
          <Icon
            name="md-create"
            style={styles.icon}
            onPress={() => { onEdit(); }}
          />
        </View>
        <View style={utilsStyles.level}>
          <View style={componentStyles(isOutlay).iconNameSavingContainer}>
            <UserAvatar user={UserStore.getUser(transaction.userKey)} />
            <View style={styles.flex}>
              <View style={componentStyles(isOutlay).nameSavingContainer}>
                <Text style={componentStyles(isOutlay).name}>
                  {transaction.name}
                </Text>
                { this.renderSavingOrOutlayTag() }
              </View>
            </View>
          </View>
          <View style={componentStyles(isOutlay).amountContainer}>
            <Text style={componentStyles(isOutlay).amount}>
              {toMoney(isOutlay ? transaction.amount.slice(1) : transaction.amount, 'PEN')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const componentStyles = isOutlay => StyleSheet.create({
  wrapper: {
    height: 108,
    padding: 12,
    backgroundColor: BACKGROUND_COLOR,
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

  outlayTag: {
    color: DANGER_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },

  amountContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  amount: {
    color: isOutlay ? DANGER_COLOR : PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
