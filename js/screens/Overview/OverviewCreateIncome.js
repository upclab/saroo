import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Container, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation';

import styles from '@styles/sarooStyles';

export default class OverviewCreateIncome extends React.Component {
  onBack() {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
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
          <Text style={styles.slimTitle}>Agregar Ingreso</Text>
        </View>
      </Container>
    );
  }
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
