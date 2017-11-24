import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';

import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  WHITE,
} from '@styles/variables';

import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

import toMoney from '@utils/money';

export const AD_PHOTO_SIZE = 80;

export default class AdOverview extends React.Component {
  render() {
    const { ad } = this.props;

    return (
      <View style={componentStyles.wrapper}>
        <View style={[utilsStyles.flexCentered, componentStyles.photoContainer]}>
          <View style={[utilsStyles.flexCentered, componentStyles.iconContainer]} >
            <Icon name="ios-pricetag" style={styles.icon} />
          </View>
        </View>
        <View style={componentStyles.nameDescriptionContainer}>
          <Text style={componentStyles.name}>
            {ad.name}
          </Text>
          <Text style={componentStyles.description}>
            {ad.description}
          </Text>
        </View>
        <View style={componentStyles.buttonContainer}>
          <Button
            bordered
            light
            style={styles.button}
          >
            <Text style={styles.amoount} uppercase={false}>
              {toMoney(ad.amount, 'PEN')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const componentStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    height: 240,
    padding: 12,
    backgroundColor: BACKGROUND_COLOR,
  },

  photoContainer: {
    width: AD_PHOTO_SIZE,
    height: AD_PHOTO_SIZE,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: WHITE,
  },

  nameDescriptionContainer: {
    flex: 1,
  },

  name: {
    height: 22,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  description: {
    flex: 1,
    color: PRIMARY_COLOR,
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 66,
    paddingBottom: 10,
  },

  amount: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
