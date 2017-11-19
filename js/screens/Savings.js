import React from 'react';
import Divider from '@components/shared/Divider';
import { StatusBar, ScrollView, Text } from 'react-native';
import { Container, Button } from 'native-base';

import SavingOverview from '@/components/savings/SavingOverview';

import { db } from '@/firebaseApp';

// Styles
import styles from '@styles/sarooStyles';
import savingsStyles from '@styles/savingsStyles';

// Lib
import { snapshotToArray } from '@/utilities/firebaseUtils';

export default class Savings extends React.Component {
  constructor() {
    super();
    this.state = {
      savings: [],
    };
  }

  componentDidMount() {
    db.ref('savings_groups').on('value', (snapshot) => {
      this.setState({ savings: snapshotToArray(snapshot) });
    });
  }

  renderSaving = saving => <SavingOverview key={saving.key} saving={saving} />

  render() {
    const { savings } = this.state;

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Ahorros</Text>
        <Divider />

        <ScrollView showsVerticalScrollIndicator={false} style={savingsStyles.content}>
          {savings.map(this.renderSaving)}
        </ScrollView>

        <Button block light style={styles.button}>
          <Text style={styles.buttonText}>
            Nuevo ahorro
          </Text>
        </Button>
      </Container>
    );
  }
}
