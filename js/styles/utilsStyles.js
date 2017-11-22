import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },

  level: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flexCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerAligned: {
    alignSelf: 'center',
  },
});
