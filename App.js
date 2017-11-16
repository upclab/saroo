import Expo from 'expo';
import React from 'react';
import App from './js/screens/Groups';

import { firebaseApp } from './js/firebaseApp';

const Roboto = require('native-base/Fonts/Roboto.ttf');
const RobotoMedium = require('native-base/Fonts/Roboto_medium.ttf');
const Ionicons = require('@expo/vector-icons/fonts/Ionicons.ttf');

export default class Saroo extends React.Component {
  constructor() {
    super();
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
    return <App />;
  }
}
