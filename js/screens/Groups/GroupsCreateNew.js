import React from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Icon, Text } from 'native-base';

// Styles
import styles from '@styles/sarooStyles';

export default class GroupsCreateNew extends React.Component {
  onBack() {
    const { navigation } = this.props;
    navigation.navigate('GroupsIndex');
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
          <Text style={styles.slimTitle}>Crear Grupo</Text>
        </View>
      </Container>
    );
  }
}
