import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {Container,Header, Content, Button, Text } from 'native-base';
import data from '@/json/Savings.json';
import * as Progress from 'react-native-progress';

export default class Savings extends React.Component {
  
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="light-content"/>
        <Text style={styles.title}>
          Ahorros
        </Text>
        <View
          style={{
            borderBottomColor: '#A8A8A8',
            borderBottomWidth: 1,
            marginTop: 25,
            marginLeft: 50,
            marginRight: 50,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {Object.values(data).map((saving, i)=>{
            return(
              <View key={i}>
                <Text style={styles.savingText}>
                  {saving.nombre}
                </Text>
                <Progress.Bar progress={saving.actual/saving.meta} width={null} height={15} style={styles.progressBar}/>
                <View style={styles.saving}>
                  <Text style={styles.progressStart}>{toMoney(saving.actual,"S")}</Text>  
                  <Text style={styles.progressEnd}>{toMoney(saving.meta,"S")}</Text>
                </View>
              </View>
            )
          })}
          
        </ ScrollView>
        
        <Button block light style={styles.button}>
          <Text style={styles.buttonText}>
            Nuevo ahorro
          </Text>
        </Button>
      </Container>
    );
  }
}

function toMoney(amount, type) {
  switch (type) {
    case "S":
      return ("S/."+ amount.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      break;
    case "$":
      return ("$"+ amount.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      break;
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //flex : 1,
  },
  content: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  progressBar: {
    marginTop: 15,
  },
  progressStart: {
    marginRight: 20,
    fontFamily: 'System',
    color: 'black',
    fontSize: 20,
  },
  progressEnd: {
    right: 0,
    fontFamily: 'System',
    color: 'black',
    fontSize: 20,
  },
  title: {
    marginTop: 70,
    marginLeft: 50,
    fontFamily: 'System',
    color: 'black',
    fontSize: 40,
    fontWeight: '800',
  },
  savingText: {
    fontFamily: 'System',
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
  },
  saving: {
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 50,
  },
  button : {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 50,
    marginRight: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#EB144C',
  },
  buttonText: {
    fontFamily: 'System',
    fontWeight: '600',
    color: 'white',
  },
});
