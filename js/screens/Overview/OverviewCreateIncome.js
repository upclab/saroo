import React from 'react';
import { Alert, Picker, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { inject, observer } from 'mobx-react/native';

import styles from '@styles/sarooStyles';
import { PRIMARY_COLOR } from '@styles/variables';

import { addIncome } from '@mobx/transactionStore';
import { toLocalDate } from '@utils/dates';

@inject('SavingStore')
@inject('TransactionStore')
@observer
export default class OverviewCreateIncome extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    name: '',
    amount: '0',
    savingKey: null,
  }

  onBack() {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onChangeDate() {
    this.setState({ isDateTimePickerVisible: true });
  }

  onDatePicked(dateObj) {
    const { TransactionStore } = this.props;
    const date = dateObj.getTime();
    TransactionStore.updateDate(date);
    this.hideDateTimePicker();
  }

  onCreateIncome() {
    const { TransactionStore } = this.props;
    const { name, amount, savingKey } = this.state;

    const date = TransactionStore.selectedDate;

    if (amount === '0') {
      Alert.alert('Porfavor ingresa un monto!');
    } else {
      addIncome({
        name,
        date,
        amount,
        savingKey,
      });
      this.onBack();
    }
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  renderSavingPickerItem = saving => (
    <Picker.Item color={PRIMARY_COLOR} key={saving.key} value={saving.key} label={saving.name} />
  );

  render() {
    const { SavingStore, TransactionStore } = this.props;
    const { savingKey } = this.state;

    return (
      <Container style={styles.fluidContainer}>
        <StatusBar barStyle="dark-content" />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          titleIOS="Escoger una fecha"
          date={new Date(TransactionStore.selectedDate)}
          cancelTextIOS="Cancelar"
          onConfirm={(date) => { this.onDatePicked(date); }}
          onCancel={() => { this.hideDateTimePicker(); }}
        />

        <View style={styles.backContainer}>
          <Icon
            style={styles.icon}
            name="ios-arrow-back"
            onPress={() => { this.onBack(); }}
          />
          <Text style={styles.slimTitle}>Agregar Ingreso</Text>
        </View>

        <View style={screenStyles.formContainer}>
          <View style={screenStyles.inputContainer}>
            <Text style={styles.formLabel}>Nombre(opcional)</Text>
            <Item>
              <Input
                style={styles.input}
                placeholderTextColor={PRIMARY_COLOR}
                underlineColorAndroid={PRIMARY_COLOR}
                onChangeText={name => this.setState({ name })}
                placeholder="nombre del ahorro"
              />
            </Item>
          </View>

          <View style={screenStyles.inputContainer}>
            <Text style={styles.formLabel}>Monto</Text>
            <Item>
              <Input
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={PRIMARY_COLOR}
                underlineColorAndroid={PRIMARY_COLOR}
                onChangeText={amount => this.setState({ amount })}
                placeholder="S/. 0.00"
              />
            </Item>
          </View>
        </View>

        <View style={screenStyles.inputContainer}>
          <Text style={styles.formLabel}>Fecha</Text>
          <Item>
            <Button
              transparent
              info
              style={screenStyles.dateButton}
              onPress={() => { this.onChangeDate(); }}
            >
              <Text
                style={screenStyles.date}
                uppercase={false}
              >
                { toLocalDate(TransactionStore.selectedDate) }
              </Text>
            </Button>
          </Item>
        </View>

        <View style={screenStyles.inputContainer}>
          <Text style={styles.formLabel}>Para Ahorro(opcional)</Text>
          <Picker
            selectedValue={savingKey}
            onValueChange={value => this.setState({ savingKey: value })}
          >
            <Picker.Item color={PRIMARY_COLOR} label="Ninguno" value={(null)} />
            {SavingStore.savings.map(saving => this.renderSavingPickerItem(saving))}
          </Picker>
        </View>

        <View style={screenStyles.buttonContainer}>
          <Button
            block
            light
            style={styles.button}
            onPress={() => { this.onCreateIncome(); }}
          >
            <Text style={styles.buttonText} uppercase={false}>
              Crear
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
