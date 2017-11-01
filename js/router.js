import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Button, Footer, FooterTab, Icon } from "native-base";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Overview from "./screens/Overview";
import Savings from "./screens/Savings";
import Stats from "./screens/Stats";
import Groups from "./screens/Groups";
import Configuration from "./screens/Configuration";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  }
});

export const SignedIn = TabNavigator(
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
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    },
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
    },
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
