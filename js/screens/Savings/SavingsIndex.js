import React from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import { Container, Button } from 'native-base';

import { inject, observer } from 'mobx-react/native';

import SavingOverview from '@/components/savings/SavingOverview';

// Styles
import styles from '@styles/sarooStyles';
import savingsStyles from '@styles/savingsStyles';

@inject('SavingStore')
@observer
export default class Savings extends React.Component {
  onAddSaving() {
    const { navigation } = this.props;
    navigation.navigate('CreateNew');
  }

  renderSaving = saving => <SavingOverview key={saving.key} saving={saving} />

  render() {
    const { SavingStore } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Ahorros</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={savingsStyles.content}>
          {SavingStore.savings.map(this.renderSaving)}
        </ScrollView>

        <Button
          block
          light
          style={styles.button}
          onPress={() => { this.onAddSaving(); }}
        >
          <Text style={styles.buttonText}>
            Nuevo ahorro
          </Text>
        </Button>
      </Container>
    );
  }
}
