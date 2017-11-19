import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import UserIconName from '@components/user/UserIconName';

// Styles
import utilsStyles from '@styles/utilsStyles';
import { PRIMARY_COLOR, DEFAULT_PADDING } from '@styles/variables';

// Lib
import { inject, observer } from 'mobx-react';
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

@inject('UserStore')
@observer
export default class GroupOverview extends React.Component {
  otherParticipants() {
    const { group, UserStore } = this.props;
    return objectToArray(group.participants)
      .filter(participant => participant.key !== UserStore.userKey);
  }

  renderUser = (user) => {
    const { UserStore } = this.props;
    if (UserStore.userKey === user.key) {
      return null;
    }
    return <UserIconName key={user.key} user={user} />;
  }

  render() {
    const { group, wrapperStyles } = this.props;

    return (
      <View style={wrapperStyles}>

        <View style={utilsStyles.level}>
          <Text style={styles.groupText}>
            {group.name}
          </Text>
          <Icon style={styles.icon} name="md-eye" />
        </View>

        <View style={utilsStyles.flex}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.otherParticipants()}
            ItemSeparatorComponent={() => <View style={{ width: DEFAULT_PADDING }} />}
            renderItem={({ item }) => this.renderUser(item)}
          />
        </View>
      </View>
    );
  }
}
