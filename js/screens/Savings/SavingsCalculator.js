import React from 'react';
import { Alert, Picker, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Container, Icon, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { inject, observer } from 'mobx-react/native';

import { frenchFee, effectiveAnualToMonthly } from '@lib/rates';
import toMoney from '@utils/money';

// Styles
import styles from '@styles/sarooStyles';
import { PRIMARY_COLOR } from '@styles/variables';

import { MONTHS_FOR_LOANS, RATES_ANUAL } from '@lib/params';

@inject('SavingStore')
@observer
export default class SavingsCalculator extends React.Component {
  state = {
    month: MONTHS_FOR_LOANS[0],
    rate: RATES_ANUAL[0],
  }

  onBack() {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onCalculate() {
    const { month, rate } = this.state;
    const payment = frenchFee(this.amount(), effectiveAnualToMonthly(rate), month);
    const money = toMoney(payment).toString();
    Alert.alert(`Cuota Mensual: ${money}`);
  }

  amount() {
    const { SavingStore } = this.props;
    return Number(SavingStore.selectedSaving.meta) - Number(SavingStore.selectedSaving.current);
  }
  render() {
    const { month, rate } = this.state;

    return (
      <Container style={styles.fluidContainer}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.backContainer}>
          <Icon
            style={styles.icon}
            name="ios-arrow-back"
            onPress={() => { this.onBack(); }}
          />
          <Text style={styles.slimTitle}>Calcular Cuota</Text>
        </View>

        <View style={screenStyles.inputContainer}>
          <Text style={styles.formLabel}>Monto: {this.amount()}</Text>
        </View>

        <View style={screenStyles.inputContainer}>
          <Text style={styles.formLabel}>Numero de Cuotas mensuales</Text>
          <Picker
            selectedValue={month}
            onValueChange={value => this.setState({ month: value })}
          >
            {
              MONTHS_FOR_LOANS.map(m => (
                <Picker.Item
                  key={m.toString()}
                  color={PRIMARY_COLOR}
                  label={m.toString()}
                  value={m.toString()}
                />
              ))
            }
          </Picker>
        </View>

        <View style={screenStyles.inputContainer}>
          <Text style={styles.formLabel}>T.E.A.</Text>
          <Picker
            selectedValue={rate}
            onValueChange={value => this.setState({ rate: value })}
          >
            {RATES_ANUAL.map(r => (
              <Picker.Item
                key={r.toString()}
                color={PRIMARY_COLOR}
                label={r.toString()}
                value={r.toString()}
              />
              ))
            }
          </Picker>
        </View>

        <View style={screenStyles.buttonContainer}>
          <Button
            block
            light
            style={styles.button}
            onPress={() => { this.onCalculate(); }}
          >
            <Text style={styles.buttonText} uppercase={false}>
              Calcular
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const screenStyles = StyleSheet.create({
  inputContainer: {
    paddingTop: 12,
    paddingLeft: 12,
  },
  date: {
    paddingTop: 12,
    paddingLeft: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
