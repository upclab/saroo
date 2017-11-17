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
    marginTop: 50,
    color: 'black',
    fontSize: 27,
    fontWeight: '800',
  },

  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: PRIMARY_COLOR,
  },

  buttonText: {
    fontWeight: '600',
    color: 'white',
  },
};
