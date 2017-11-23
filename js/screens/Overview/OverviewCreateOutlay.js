import React from 'react';
import { Alert, Picker, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { inject, observer } from 'mobx-react/native';

import styles from '@styles/sarooStyles';
import { PRIMARY_COLOR } from '@styles/variables';

import { addOutlay, outlayTags } from '@mobx/transactionStore';
import { toLocalDate } from '@utils/dates';

@inject('TransactionStore')
@observer
export default class OverviewCreateOutlay extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    name: '',
    amount: '0',
    outlayTagKey: outlayTags[0].key,
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

  onCreateOutlay() {
    const { TransactionStore } = this.props;
    const { name, amount, outlayTagKey } = this.state;

    const date = TransactionStore.selectedDate;

    if (amount === '0') {
      Alert.alert('Porfavor ingresa un monto!');
    } else {
      addOutlay({
        name,
        date,
        amount,
        outlayTagKey,
      });
      this.onBack();
    }
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  renderOutlayTagPickerItem = outlayTag => (
    <Picker.Item
      color={PRIMARY_COLOR}
      key={outlayTag.key}
      value={outlayTag.key}
      label={outlayTag.name}
    />
  );

  render() {
    const { TransactionStore } = this.props;
    const { outlayTagKey } = this.state;

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
          <Text style={styles.slimTitle}>Agregar Gasto</Text>
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
                placeholder="nombre del gasto"
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
          <Text style={styles.formLabel}>Categoría de Gasto</Text>
          <Picker
            selectedValue={outlayTagKey}
            onValueChange={value => this.setState({ outlayTagKey: value })}
          >
            {outlayTags.map(outlayTag => this.renderOutlayTagPickerItem(outlayTag))}
          </Picker>
        </View>

        <View style={screenStyles.buttonContainer}>
          <Button
            block
            light
            style={styles.button}
            onPress={() => { this.onCreateOutlay(); }}
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
