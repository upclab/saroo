import React, { Component } from 'react';
import { Alert, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import TransactionOverview from '@components/overview/TransactionOverview';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import toMoney from '@utils/money';
import { DEFAULT_PADDING, PRIMARY_COLOR } from '../../styles/variables';

const data = [
  {
    name: 'Cachuelos',
    date: 1484327532000,
    amount: '600',
    userKey: 'Bo1LiR5QosUuI3ghrY2Utoevf633',
    savingKey: 'sv04',
  },
  {
    amount: '200',
    date: 1485018732000,
    userKey: 'LlPqnpN1iEYGMzMvtp3A47z2vxo1',
  },
  {
    date: 1485709932000,
    amount: '-700',
    userKey: 'LlPqnpN1iEYGMzMvtp3A47z2vxo1',
  },
  {
    name: 'Cachuelos',
    date: 1485709932000,
    amount: '400',
    userKey: 'X5Y77238hZRXQt6SOzZxLvvYQNi2',
    savingKey: 'sv04',
  },
];

export default class OverviewIndex extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  onChangeDate() {
    this.setState({ isDateTimePickerVisible: true });
  }

  onCreateIncome() {
    const { navigation } = this.props;
    navigation.navigate('CreateNewIncome');
  }

  onCreateOutlay() {
    const { navigation } = this.props;
    navigation.navigate('CreateNewOutlay');
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked(date) {
    Alert.alert(date.getTime().toString());
    this.hideDateTimePicker();
  }

  renderTransaction = transaction =>
    <TransactionOverview transaction={transaction} />

  render() {
    return (
      <View style={[utilsStyles.flex, styles.container]}>
        <StatusBar barStyle="dark-content" />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          titleIOS="Escoger una fecha"
          cancelTextIOS="Cancelar"
          onConfirm={(date) => { this.handleDatePicked(date); }}
          onCancel={() => { this.hideDateTimePicker(); }}
        />

        <View>
          <Button
            bordered
            rounded
            info
            style={screenStyles.dateContainer}
            onPress={() => { this.onChangeDate(); }}
          >
            <Text style={screenStyles.date} uppercase={false}>Enero - 2017</Text>
          </Button>
        </View>

        <View style={screenStyles.resumeContainer}>
          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeItemLabel}>Ingresos</Text>
              <Text style={screenStyles.resumeItemValue}>{toMoney('5000', 'PEN')}</Text>
            </View>
          </View>

          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeItemLabel}>Gastos</Text>
              <Text style={screenStyles.resumeItemValue}>{toMoney('1200', 'PEN')}</Text>
            </View>
          </View>

          <View style={screenStyles.resumeItemContainer}>
            <View style={utilsStyles.level}>
              <Text style={screenStyles.resumeLabel}>Total</Text>
              <Text style={screenStyles.resumeValue}>{toMoney('1200', 'PEN')}</Text>
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
          <FlatList
            style={screenStyles.transactionsList}
            data={data}
            keyExtractor={item => item.amount}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: DEFAULT_PADDING }} />}
            renderItem={({ item }) => this.renderTransaction(item)}
          />
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

  dateContainer: {
    marginTop: 14,
    alignSelf: 'center',
  },

  date: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  transactionsList: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
