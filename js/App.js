
import React from 'react';

import { Platform, StatusBar } from 'react-native';
import { Root, Footer, FooterTab, Button, Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';

import Overview from './components/Overview/index';
import Savings from './components/Savings/index';
import Stats from './components/Stats/index';
import Groups from './components/Groups/index';
import Configuration from './components/Configuration/index';

export default (MainScreenNavigator = TabNavigator(
  {
    Overview: { screen: Overview },
    Savings: { screen: Savings },
    Stats: { screen: Stats },
    Groups: { screen: Groups },
    Configuration: { screen: Configuration },
  },
  {
    initialRouteName: "Overview",
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      const { navigate } = props.navigation;

      return (
        <Footer>
          <FooterTab>
            <Button
              active={props.navigationState.index === 0}
              onPress={() => navigate('Overview')}
            >
              <Icon name="ios-list-box"/>
            </Button>
            <Button
              active={props.navigationState.index === 1}
              onPress={() => navigate('Savings')}
            >
              <Icon name="plane"/>
            </Button>
            <Button
              active={props.navigationState.index === 2}
              onPress={() => navigate('Stats')}
            >
              <Icon name="ios-podium"/>
            </Button>
            <Button
              active={props.navigationState.index === 3}
              onPress={() => navigate('Groups')}
            >
              <Icon name="md-people"/>
            </Button>
            <Button
              active={props.navigationState.index === 4}
              onPress={() => navigate('Configuration')}
            >
              <Icon name="md-settings"/>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  },
));
