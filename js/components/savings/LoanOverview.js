import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { SQUARE_SIZE } from '@components/user/UserAvatar';

import {
  BACKGROUND_COLOR,
  BACKGROUND_DARKER_COLOR,
  PRIMARY_COLOR,
} from '@styles/variables';

import utilsStyles from '@styles/utilsStyles';

import toMoney from '@utils/money';
import { daysToReadableTIme } from '@utils/dates';

export default class LoanOverview extends React.Component {
  render() {
    const { loan } = this.props;

    return (
      <View style={componentStyles.wrapper}>
        <View style={utilsStyles.level}>
          <Image source={{ uri: loan.bank.photo }} style={componentStyles.entityPhoto} />
          <View>
            <View style={componentStyles.amountTimeContainer}>
              <Text style={componentStyles.amount}>
                {`${toMoney(loan.amount, 'PEN')} al mes`}
              </Text>
              <Text style={componentStyles.time}>
                {daysToReadableTIme(loan.time)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const componentStyles = StyleSheet.create({
  wrapper: {
    height: 72,
    padding: 12,
    backgroundColor: BACKGROUND_COLOR,
  },

  body: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  amountTimeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 8,
  },

  entityPhoto: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: BACKGROUND_DARKER_COLOR,
  },

  amount: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  time: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    textAlign: 'right',
  },
});
