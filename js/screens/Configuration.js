import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

export default function () {
  return (
    <View style={[styles.container, utilsStyles.flexCentered]}>
      <Button danger style={utilsStyles.centerAligned}>
        <Text style={styles.buttonText} uppercase={false}>
          Cerrar Sesión
        </Text>
      </Button>
    </View>
  );
}
