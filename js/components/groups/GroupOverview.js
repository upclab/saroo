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
  wrapper: {
    height: 136,
  },
  groupText: {
    marginBottom: 26,
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
  icon: {
    color: PRIMARY_COLOR,
  },
});

@inject('GroupStore')
@inject('UserStore')
@observer
export default class GroupOverview extends React.Component {
  otherParticipants() {
    const { group, UserStore } = this.props;
    return objectToArray(group.participants)
      .filter(participant => participant.key !== UserStore.userKey);
  }

  isSelected() {
    const { GroupStore, group } = this.props;
    return GroupStore.selectedGroupKey === group.key;
  }

  rederAction() {
    const { group, GroupStore } = this.props;

    if (this.isSelected()) {
      return <Icon style={styles.icon} name="md-create" />;
    }
    return (
      <Icon
        style={styles.icon}
        name="md-eye"
        onPress={() => GroupStore.updateSelectedGroupKey(group.key)}
      />
    );
  }

  renderUser = user => <UserIconName key={user.key} user={user} />;

  render() {
    const { group, wrapperStyles } = this.props;

    return (
      <View style={[styles.wrapper, wrapperStyles]}>

        <View style={utilsStyles.level}>
          <Text style={styles.groupText}>
            {group.name}
          </Text>
          { this.rederAction() }
        </View>

        <View>
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
