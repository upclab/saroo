import Expo from 'expo';

import { WHITE, PRIMARY_COLOR } from '@styles/variables';

export default {
  container: {
    marginTop: Expo.Constants.statusBarHeight,
    backgroundColor: WHITE,
    paddingLeft: 30,
    paddingRight: 30,
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
};
