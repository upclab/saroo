import React from 'react';
import { FlatList, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Container, Icon, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { inject, observer } from 'mobx-react/native';

import TransactionOverview from '@components/overview/TransactionOverview';
import SavingOverview from '@/components/savings/SavingOverview';
import LoanOverview from '@/components/savings/LoanOverview';
import AdOverview from '@/components/savings/AdOverview';
import Tab from '@/components/shared/Tab';

// Styles
import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';
import { DEFAULT_PADDING, PRIMARY_COLOR, WHITE } from '@styles/variables';

const ads = [
  {
    key: '1',
    name: 'DisneyLand Resort',
    description: 'Paquete para 5 personas',
    amount: '7599.99',
  },
  {
    key: '2',
    name: 'Reno Vacation',
    description: 'Paquete para 4 personas',
    amount: '6219.99',
  },
  {
    key: '3',
    name: 'Despegar.com',
    description: 'Paquete para 5 personas',
    amount: '7599.99',
  },
  {
    key: '4',
    name: 'Cot Travel',
    description: 'Paquete para parejas',
    amount: '3699.99',
  },
  {
    key: '5',
    name: 'Disney Travel',
    description: 'Paquete para 2 personas',
    amount: '3999.99',
  },
];

@inject('SavingStore')
@observer
export default class SavingsSaving extends React.Component {
  state = {
    selectedTab: '0',
  }

  onBack() {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onOpenCalculator() {
    const { navigation } = this.props;
    navigation.navigate('SavingsCalculator');
  }

  changeTab(tab) {
    this.setState({ selectedTab: tab });
  }

  renderAd = ad =>
    <AdOverview ad={ad} />

  renderLoan = loan =>
    <LoanOverview loan={loan} />

  renderTransaction = transaction =>
    <TransactionOverview transaction={transaction} />

  renderAdsTab() {
    return (
      <FlatList
        style={screenStyles.historialList}
        data={ads}
        horizontal={false}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() =>
          <View style={{ width: DEFAULT_PADDING, height: DEFAULT_PADDING }} />
        }
        renderItem={({ item }) => this.renderAd(item)}
      />
    );
  }

  renderHistorialTab() {
    const { SavingStore } = this.props;

    if (SavingStore.transactions.length > 0) {
      return (
        <FlatList
          style={screenStyles.historialList}
          data={SavingStore.transactions}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: DEFAULT_PADDING }} />}
          renderItem={({ item }) => this.renderTransaction(item)}
        />
      );
    }
    return (
      <View>
        <Text style={screenStyles.transactionsEmptyText}>No se registraron transacciones!</Text>
      </View>
    );
  }

  renderLoansTab() {
    const { SavingStore } = this.props;

    return (
      <View style={utilsStyles.flex}>
        <FlatList
          style={screenStyles.loansList}
          data={SavingStore.loans}
          keyExtractor={item => item.bankKey}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: DEFAULT_PADDING }} />}
          renderItem={({ item }) => this.renderLoan(item)}
        />
        <View style={screenStyles.calculatorButton}>
          <Button
            bordered
            info
            onPress={() => { this.onOpenCalculator(); }}
          >
            <Text uppercase={false}>Abrir Calculadora</Text>
          </Button>
        </View>
      </View>
    );
  }

  renderTabContent() {
    const { selectedTab } = this.state;

    if (selectedTab === '2') {
      return this.renderAdsTab();
    } else if (selectedTab === '1') {
      return this.renderHistorialTab();
    }
    return this.renderLoansTab();
  }

  render() {
    const { SavingStore } = this.props;
    const { selectedTab } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content" />

        <View style={styles.backActionContainer}>
          <Icon
            style={styles.touchableIcon}
            name="ios-arrow-back"
            onPress={() => { this.onBack(); }}
          />
          <Text style={styles.backTitle}>{SavingStore.selectedSaving.name}</Text>
          <View style={styles.backAligner} />
        </View>

        <View style={[styles.bodyContainer, utilsStyles.flex]}>
          <SavingOverview saving={SavingStore.selectedSaving} hideTitle />
          <View style={screenStyles.tabsContainer}>
            <Tab
              title="Prestamos"
              onPress={() => { this.changeTab('0'); }}
              isActive={selectedTab === '0'}
            />
            <Tab
              title="Historial"
              onPress={() => { this.changeTab('1'); }}
              isActive={selectedTab === '1'}
            />
            <Tab
              title="Promos"
              onPress={() => { this.changeTab('2'); }}
              isActive={selectedTab === '2'}
            />
          </View>
          <View style={utilsStyles.flex}>
            { this.renderTabContent() }
          </View>
        </View>
        <View style={{ height: DEFAULT_PADDING, backgroundColor: WHITE }} />
      </Container>
    );
  }
}

const screenStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
  },

  calculatorButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEFAULT_PADDING,
    height: 60,
  },

  transactionsEmptyText: {
    color: PRIMARY_COLOR,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
