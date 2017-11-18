import React from 'react';

import { Footer, FooterTab, Button, Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';

import Overview from '@/screens/Overview';
import Savings from '@/screens/Savings';
import Stats from '@/screens/Stats';
import Groups from '@/screens/Groups';
import Configuration from '@/screens/Configuration';

export default new TabNavigator(
  {
    Overview: { screen: Overview },
    Savings: { screen: Savings },
    Stats: { screen: Stats },
    Groups: { screen: Groups },
    Configuration: { screen: Configuration },
  },
  {
    initialRouteName: 'Overview',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: (props) => {
      const { navigate } = props.navigation;

      return (
        <Footer>
          <FooterTab>
            <Button
              active={props.navigationState.index === 0}
              onPress={() => navigate('Overview')}
            >
              <Icon name="ios-list-box" />
            </Button>
            <Button
              active={props.navigationState.index === 1}
              onPress={() => navigate('Savings')}
            >
              <Icon name="plane" />
            </Button>
            <Button
              active={props.navigationState.index === 2}
              onPress={() => navigate('Stats')}
            >
              <Icon name="ios-podium" />
            </Button>
            <Button
              active={props.navigationState.index === 3}
              onPress={() => navigate('Groups')}
            >
              <Icon name="md-people" />
            </Button>
            <Button
              active={props.navigationState.index === 4}
              onPress={() => navigate('Configuration')}
            >
              <Icon name="md-settings" />
            </Button>
          </FooterTab>
        </Footer>
      );
    },
  },
);
