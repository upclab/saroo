import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import { signOut } from '@/auth';

export default function ({ navigation }) {
  return (
    <View style={[styles.container, utilsStyles.flexCentered]}>
      <Button
        danger
        style={utilsStyles.centerAligned}
        onPress={() => signOut().then(() => navigation.navigate('SignedOut'))}
      >
        <Text style={styles.buttonText} uppercase={false}>
          Cerrar Sesión
        </Text>
      </Button>
    </View>
  );
}
