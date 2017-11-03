// Components
import React from 'react';
import Divider from '@components/shared/Divider';
import { View, StatusBar, ScrollView } from 'react-native';
import { Container, Button, Text } from 'native-base';
import * as Progress from 'react-native-progress';
import data from '@/json/Savings.json';

// Styles
import savings from '@styles/savings';
import container from '@styles/container';

// Utilities
import toMoney from '@/utilities/money';

export default () => (
  <Container style={container.main}>
    <StatusBar
      barStyle="light-content"
    />
    <Text style={container.title}>
      Ahorros
    </Text>
    <Divider />
    <ScrollView showsVerticalScrollIndicator={false} style={savings.content}>
      {Object.values(data).map(sv => (
        <View key={sv.name}>
          <Text style={sv.savingText}>
            {sv.name}
          </Text>
          <Progress.Bar color="rgb(92, 107, 192)" progress={sv.current / sv.meta} width={null} height={15} style={savings.progressBar} />
          <View style={savings.saving}>
            <Text style={savings.progressStart}>{toMoney(sv.current, 'PEN')}</Text>
            <Text style={savings.progressEnd}>{toMoney(sv.meta, 'PEN')}</Text>
          </View>
        </View>
        ))}
    </ScrollView>

    <Button block light style={container.button}>
      <Text style={container.buttonText}>
        Nuevo ahorro
      </Text>
    </Button>
  </Container>
);
