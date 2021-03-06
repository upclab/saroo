import Expo from 'expo';
import React from 'react';

import { Provider } from 'mobx-react/native';

// Stores
import GroupStore from '@mobx/groupStore';
import UserStore from '@mobx/userStore';
import BankStore from '@mobx/bankStore';
import SavingStore from '@mobx/savingStore';
import MainStore from '@mobx/mainStore';
import TransactionStore from '@mobx/transactionStore';

import App from '@/index';

const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');
const Ionicons = require('@expo/vector-icons/fonts/Ionicons.ttf');

const Root = (
  <Provider
    UserStore={UserStore}
    GroupStore={GroupStore}
    SavingStore={SavingStore}
    MainStore={MainStore}
    BankStore={BankStore}
    TransactionStore={TransactionStore}
  >
    <App />
  </Provider>
);

export default class Saroo extends React.Component {
  constructor() {
    super();

    console.ignoredYellowBox = [
      'Setting a timer',
    ];

    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
      Ionicons,
    });

    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return Root;
  }
}
