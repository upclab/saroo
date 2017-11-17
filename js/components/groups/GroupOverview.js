import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import UserIconName from '@components/user/UserIconName';

// Styles
import utilsStyles from '@styles/utilsStyles';
import { PRIMARY_COLOR } from '@styles/variables';

// Lib
import { objectToArray } from '@/utilities/firebaseUtils';

const styles = StyleSheet.create({
  groupText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    color: PRIMARY_COLOR,
  },
});

export default class GroupOverview extends React.Component {
  users() {
    const { participants } = this.props.group;
    return objectToArray(participants);
  }

  renderUser = user => <UserIconName key={user.key} user={user} />

  render() {
    const { group } = this.props;

    return (
      <View>
        <View style={utilsStyles.level}>
          <Text style={styles.groupText}>
            {group.name}
          </Text>
          <Icon style={styles.icon} name="md-create" />
        </View>
        <View>
          {this.users().map(this.renderUser)}
        </View>
      </View>
    );
  }
}
