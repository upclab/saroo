import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Simple extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hola</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
