import React from 'react';
import { Text, StatusBar, ScrollView } from 'react-native';
import { Container, Button } from 'native-base';
import styles from '@styles/groups';
import containerStyles from '@styles/container';
import savingsStyles from '@styles/savings';
import Divider from '@components/shared/Divider';

export default () => (
  <Container style={containerStyles.main}>
    <StatusBar barStyle="light-content" />
    <Text style={containerStyles.title}>Grupos</Text>
    <Divider />
    <ScrollView showsVerticalScrollIndicator={false} style={savingsStyles.content}>
      <Text style={savingsStyles.savingText}>Hola</Text>
    </ScrollView>
    <Button block light style={containerStyles.button}>
      <Text style={containerStyles.buttonText}>
        NUEVO AHORRO
      </Text>
    </Button>
  </Container>
);
