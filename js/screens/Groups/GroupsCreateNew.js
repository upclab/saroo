import React from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Icon, Text } from 'native-base';

import { NavigationActions } from 'react-navigation'

// Styles
import styles from '@styles/sarooStyles';

export default class GroupsCreateNew extends React.Component {
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
            style={styles.touchableIcon}
            name="ios-arrow-back"
            onPress={() => { this.onBack(); }}
          />
          <Text style={styles.slimTitle}>Crear Grupo</Text>
        </View>
      </Container>
    );
  }
}
