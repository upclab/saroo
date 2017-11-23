import React, { Component } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import TransactionOverview from '@components/overview/TransactionOverview';

import { inject, observer } from 'mobx-react/native';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import toMoney from '@utils/money';
import { toMonthAndYear } from '@utils/dates';

import { DEFAULT_PADDING, PRIMARY_COLOR } from '@styles/variables';

@inject('TransactionStore')
@observer
export default class OverviewIndex extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  onChangeDate() {
    this.setState({ isDateTimePickerVisible: true });
  }

  onDateBack() {
    const { TransactionStore } = this.props;
    TransactionStore.goToPreviousMonth();
  }

  onDateForward() {
    const { TransactionStore } = this.props;
    TransactionStore.goToNextMonth();
  }

  onCreateIncome() {
    const { navigation } = this.props;
    navigation.navigate('CreateNewIncome');
  }

  onCreateOutlay() {
    const { navigation } = this.props;
    navigation.navigate('CreateNewOutlay');
  }

  incomesTotal() {
    const { monthTransactions } = this.props.TransactionStore;

    let incomesTotalValue = 0;
    monthTransactions.forEach((t) => {
      const amount = Number(t.amount);
      if (amount > 0) {
        incomesTotalValue += amount;
      }
    });
    return incomesTotalValue;
  }

  outlaysTotal() {
    const { monthTransactions } = this.props.TransactionStore;

    let outlaysTotalValue = 0;
    monthTransactions.forEach((t) => {
      const amount = Number(t.amount);
      if (amount < 0) {
        outlaysTotalValue += -Number(t.amount);
      }
    });
    return outlaysTotalValue;
  }

  statement() {
    const { monthTransactions } = this.props.TransactionStore;

    let statementValue = 0;
    monthTransactions.forEach((t) => {
      statementValue += Number(t.amount);
    });
    return statementValue;
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked(dateObj) {
    const { TransactionStore } = this.props;
    const date = dateObj.getTime();
    TransactionStore.updateDate(date);
    this.hideDateTimePicker();
  }

  renderTransactionsEmpty = () => (
    <View>
      <Text style={screenStyles.transactionsEmptyText}>No hay actividad en este mes!</Text>
    </View>
  );

  renderTransactionsNormal() {
    const { TransactionStore } = this.props;
    return (
      <FlatList
        style={screenStyles.transactionsList}
        data={TransactionStore.monthTransactions}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: DEFAULT_PADDING }} />}
        renderItem={({ item }) => this.renderTransaction(item)}
      />
    );
  }

  renderTransaction = transaction =>
    <TransactionOverview transaction={transaction} />

  render() {
    const { TransactionStore } = this.props;

    return (
      <View style={[utilsStyles.flex, styles.container]}>
        <StatusBar barStyle="dark-content" />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          titleIOS="Escoger una fecha"
          date={new Date(TransactionStore.selectedDate)}
          cancelTextIOS="Cancelar"
          onConfirm={(date) => { this.handleDatePicked(date); }}
          onCancel={() => { this.hideDateTimePicker(); }}
        />

        <View style={screenStyles.dateActionsContainer}>
          <View style={screenStyles.dateBackContainer}>
            <Button
              bordered
              rounded
              info
              onPress={() => { this.onDateBack(); }}
            >
              <Icon name="ios-arrow-back" style={styles.icon} />
            </Button>
          </View>

          <Button
            bordered
            rounded
            info
            style={screenStyles.dateContainer}
            onPress={() => { this.onChangeDate(); }}
          >
            <Text
              style={screenStyles.date}
              uppercase={false}
            >
              { toMonthAndYear(TransactionStore.selectedDate) }
            </Text>
          </Button>

          <View style={screenStyles.dateForwardContainer}>
            <Button
              bordered
              rounded
              info
              onPress={() => { this.onDateForward(); }}
            >
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </Button>
          </View>
        </View>

        <View style={screenStyles.resumeContainer}>
          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeItemLabel}>Ingresos</Text>
              <Text style={screenStyles.resumeItemValue}>{toMoney(this.incomesTotal(), 'PEN')}</Text>
            </View>
          </View>

          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeItemLabel}>Gastos</Text>
              <Text style={screenStyles.resumeItemValue}>{toMoney(this.outlaysTotal(), 'PEN')}</Text>
            </View>
          </View>

          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeLabel}>Total</Text>
              <Text style={screenStyles.resumeValue}>{toMoney(this.statement(), 'PEN')}</Text>
            </View>
          </View>

          <View style={screenStyles.actionContainer}>
            <View style={utilsStyles.level}>
              <Button
                style={styles.button}
                block
                onPress={() => { this.onCreateIncome(); }}
              >
                <Text style={styles.buttonText} uppercase={false}>Nuevo Ingreso</Text>
              </Button>

              <Button
                style={styles.button}
                block
                onPress={() => { this.onCreateOutlay(); }}
              >
                <Text style={styles.buttonText} uppercase={false}>Nuevo Gasto</Text>
              </Button>
            </View>
          </View>
        </View>

        <View style={screenStyles.transactionsContainer}>
          { TransactionStore.monthTransactions.length > 0 ?
            this.renderTransactionsNormal() :
            this.renderTransactionsEmpty()
          }
        </View>

        <View style={{ height: DEFAULT_PADDING }} />
      </View>
    );
  }
}

const screenStyles = StyleSheet.create({
  resumeContainer: {
    marginTop: 10,
  },

  actionContainer: {
    height: 80,
  },

  transactionsContainer: {
    flex: 1,
  },

  resumeItemContainer: {
    marginTop: 10,
    marginBottom: 10,
  },

  resumeItemLabel: {
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
  resumeItemValue: {
    color: PRIMARY_COLOR,
    fontSize: 20,
  },

  resumeLabel: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
  },
  resumeValue: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 22,
  },

  dateActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
  },

  date: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  transactionsEmptyText: {
    color: PRIMARY_COLOR,
    fontStyle: 'italic',
    alignSelf: 'center',
  },

  transactionsList: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
