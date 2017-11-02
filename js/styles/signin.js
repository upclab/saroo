import React, { StyleSheet } from "react-native";
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 280,
    height: 100
  },
  fieldsContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
  },
  field: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  loginButton: {
    marginTop: 36,
  },
  loginActionsText: {
    color: '#2699FB',
    textAlign: 'center',
  },
  socialButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  socialButton: {
    marginLeft: 18,
    marginRight: 18,
  },
  facebookButton: {
    color: '#3b5998',
  },
  googleButton: {
    color: '#d62d20',
  },
  signUpTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
