import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import UserIconName from '@components/user/UserIconName';

// Styles
import utilsStyles from '@styles/utilsStyles';
import { PRIMARY_COLOR, DEFAULT_PADDING } from '@styles/variables';

// Lib
import { objectToArray } from '@/utilities/firebaseUtils';

const styles = StyleSheet.create({
  groupText: {
    marginBottom: 26,
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

  renderUser = user =>
    <UserIconName key={user.key} user={user} />

  render() {
    const { group, wrapperStyles } = this.props;

    return (
      <View style={wrapperStyles}>
        <View style={utilsStyles.level}>
          <Text style={styles.groupText}>
            {group.name}
          </Text>
          <Icon style={styles.icon} name="md-create" />
        </View>
        <View style={utilsStyles.ss}>
          <FlatList
            horizontal
            data={this.users()}
            ItemSeparatorComponent={() => <View style={{ height: 20, width: 20 }} />}
            renderItem={({ item }) => this.renderUser(item)}
          />
        </View>
      </View>
    );
  }
}
