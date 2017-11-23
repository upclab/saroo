import React from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

// Styles
import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';
import { PRIMARY_COLOR } from '@styles/variables';

import { addSaving } from '@mobx/savingStore';

export default class SavingsCreateNew extends React.Component {
  state = {
    name: '',
    meta: '',
    amount: '0',
  }

  onBack() {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onCreateSaving() {
    const { name, meta, amount } = this.state;
    const { navigation } = this.props;

    if (name.trim() === '') {
      Alert.alert('Porfavor ingresa un nombre para el nuevo fondo!');
    } else if (meta === '0') {
      Alert.alert('Porfavor ingresa una meta para el nuevo fondo!');
    } else {
      addSaving({ name, meta, initialAmount: amount });
      navigation.dispatch(NavigationActions.back());
    }
  }

  render() {
    return (
      <Container style={styles.fluidContainer}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.backContainer}>
          <Icon
            style={styles.icon}
            name="ios-arrow-back"
            onPress={() => { this.onBack(); }}
          />
          <Text style={styles.slimTitle}>Crear Plan de Ahorro</Text>
        </View>


        <View style={utilsStyles.flex}>
          <View style={screenStyles.inputContainer}>
            <Text style={styles.formLabel}>Nombre</Text>
            <Item>
              <Input
                style={styles.input}
                placeholderTextColor={PRIMARY_COLOR}
                underlineColorAndroid={PRIMARY_COLOR}
                onChangeText={name => this.setState({ name })}
                placeholder="Plan de ahorros"
              />
            </Item>
          </View>

          <View style={screenStyles.inputContainer}>
            <Text style={styles.formLabel}>Meta</Text>
            <Item>
              <Input
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={PRIMARY_COLOR}
                underlineColorAndroid={PRIMARY_COLOR}
                onChangeText={meta => this.setState({ meta })}
                placeholder="Meta final"
              />
            </Item>
          </View>

          <View style={screenStyles.inputContainer}>
            <Text style={styles.formLabel}>Monto Inicial (opcional)</Text>
            <Item>
              <Input
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={PRIMARY_COLOR}
                underlineColorAndroid={PRIMARY_COLOR}
                onChangeText={amount => this.setState({ amount })}
                placeholder="Monto inicial"
              />
            </Item>
          </View>
        </View>

        <Button
          block
          light
          style={styles.button}
          onPress={() => { this.onCreateSaving(); }}
        >
          <Text style={styles.buttonText}>
            Crear
          </Text>
        </Button>
      </Container>
    );
  }
}

const screenStyles = StyleSheet.create({
  inputContainer: {
    paddingTop: 12,
    paddingLeft: 12,
  },
});
