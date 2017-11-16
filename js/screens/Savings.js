// Components
import React from 'react';
import Divider from '@components/shared/Divider';
import { View, StatusBar, ScrollView } from 'react-native';
import { Container, Button, Text } from 'native-base';
import * as Progress from 'react-native-progress';
import data from '@/json/Savings.json';

// Styles
import styles from '@styles/sarooStyles';
import savingsStyles from '@styles/savingsStyles';

// Utilities
import toMoney from '@/utilities/money';

export default class Savings extends React.Component {
  constructor() {
    super();

    this.state = {
      savings: [],
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.title}>
          Ahorros
        </Text>
        <Divider />
        <ScrollView showsVerticalScrollIndicator={false} style={savingsStyles.content}>
          {Object.values(data).map(sv => (
            <View key={sv.name}>
              <Text style={sv.savingText}>
                {sv.name}
              </Text>
              <Progress.Bar
                color="rgb(92, 107, 192)"
                progress={sv.current / sv.meta}
                width={null}
                height={15}
                style={savingsStyles.progressBar}
              />
              <View style={savingsStyles.saving}>
                <Text style={savingsStyles.progressStart}>{toMoney(sv.current, 'PEN')}</Text>
                <Text style={savingsStyles.progressEnd}>{toMoney(sv.meta, 'PEN')}</Text>
              </View>
            </View>
            ))}
        </ScrollView>

        <Button block light style={styles.button}>
          <Text style={styles.buttonText}>
            Nuevo ahorro
          </Text>
        </Button>
      </Container>
    )
  }
}
