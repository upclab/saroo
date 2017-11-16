import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { auth } from '@/firebaseApp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => (
  <View style={styles.container}>
    <Text>Bienvienido!</Text>
    <Text>{ auth.currentUser.displayName }</Text>
  </View>
);
