import React from 'react';
import { Text, StatusBar, ScrollView } from 'react-native';
import { Container, Button } from 'native-base';

import styles from '@styles/sarooStyles';
import groupsStyles from '@styles/groupsStyles';

import Divider from '@components/shared/Divider';

export default () => (
  <Container style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Grupos</Text>
    <Divider />
    <ScrollView showsVerticalScrollIndicator={false} style={groupsStyles.content}>
      <Text style={groupsStyles.savingText}>Hola</Text>
    </ScrollView>
    <Button block light style={styles.button}>
      <Text style={styles.buttonText}>
        Nuevo Grupo
      </Text>
    </Button>
  </Container>
);
