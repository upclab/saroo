import Expo from 'expo';

import { WHITE, PRIMARY_COLOR } from '@styles/variables';

export default {
  fluidContainer: {
    marginTop: Expo.Constants.statusBarHeight,
    backgroundColor: WHITE,
    paddingLeft: 5,
    paddingRight: 5,
  },

  container: {
    marginTop: Expo.Constants.statusBarHeight,
    backgroundColor: WHITE,
    paddingLeft: 30,
    paddingRight: 30,
  },

  backContainer: {
    paddingTop: 14,
    paddingLeft: 10,
    paddingBottom: 14,
  },

  slimTitle: {
    color: PRIMARY_COLOR,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    marginTop: 20,
    marginBottom: 10,
    color: PRIMARY_COLOR,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: PRIMARY_COLOR,
  },

  buttonText: {
    fontWeight: 'bold',
    color: WHITE,
  },

  input: {
    color: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },

  icon: {
    color: PRIMARY_COLOR,
  },

  touchableIcon: {
    color: PRIMARY_COLOR,
    padding: 15,
  },

  formLabel: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
};
