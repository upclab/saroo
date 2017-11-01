
import React from "react";

import { Platform, StatusBar } from "react-native";
import { Root, Footer, FooterTab, Button, Icon } from "native-base";
import { StackNavigator } from "react-navigation";

import Simple from "./components/simple";

const AppNavigator = StackNavigator(
  {
      Overview: { screen: Simple },
      Savings: { screen: Simple },
      Stats: { screen: Simple },
      Stats: { screen: Simple },
      Groups: { screen: Simple },
      Config: { screen: Simple },
  },
  {
      initialRouteName: "Overview",
      headerMode: "none",
  },
);

export default () =>
    <Root>
        <AppNavigator />
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="plane" />
            </Button>
            <Button>
              <Icon name="pie-graph" />
            </Button>
            <Button>
              <Icon name="person-stalker" />
            </Button>
          </FooterTab>
        </Footer>
    </Root>;
