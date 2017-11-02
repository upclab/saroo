//Components
import React from 'react';
import Divider from '@components/shared/divider';
import { View, StatusBar, ScrollView} from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import * as Progress from 'react-native-progress';
//Data
import data from '@/json/Savings.json';
//Styles
import savings from '@styles/savings';
import container from '@styles/container';
//Utilities
import toMoney from '@/utilities/money';


export default class Savings extends React.Component {
  render() {
    return (
      <Container style={container.main}>
        <StatusBar
          barStyle="light-content"/>
        <Text style={container.title}>
          Ahorros
        </Text>
        <Divider/>
        <ScrollView showsVerticalScrollIndicator={false} style={savings.content}>
          {Object.values(data).map((sv, i)=>{
            return(
              <View key={i}>
                <Text style={sv.savingText}>
                  {sv.nombre}
                </Text>
                <Progress.Bar color="rgb(92, 107, 192)" progress={sv.actual/sv.meta} width={null} height={15} style={savings.progressBar}/>
                <View style={savings.saving}>
                  <Text style={savings.progressStart}>{toMoney(sv.actual,"PEN")}</Text>  
                  <Text style={savings.progressEnd}>{toMoney(sv.meta,"PEN")}</Text>
                </View>
              </View>
            )
          })}
          
        </ ScrollView>
        
        <Button block light style={container.button}>
          <Text style={container.buttonText}>
            Nuevo ahorro
          </Text>
        </Button>
      </Container>
    );
  }
}


