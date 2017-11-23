import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import UserIconName from '@components/user/UserIconName';

// Styles
import styles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';
import { PRIMARY_COLOR, DEFAULT_PADDING } from '@styles/variables';

// Lib
import { inject, observer } from 'mobx-react/native';
import { objectToArray } from '@/utilities/firebaseUtils';

import MainStore from '@mobx/mainStore';

function onEditGroup() {
  Alert.alert('No estás autorizado para editar un grupo!');
}

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

  async selectGroup() {
    const { group, GroupStore } = this.props;

    MainStore.showLoader();
    await GroupStore.updateSelectedGroupKey(group.key, { fetchOnce: true });
    MainStore.hideLoader();
  }

  rederAction() {
    if (this.isSelected()) {
      return (
        <Icon
          style={styles.touchableIcon}
          name="md-create"
          onPress={() => { onEditGroup(); }}
        />
      );
    }
    return (
      <Icon
        style={styles.touchableIcon}
        name="md-eye"
        onPress={() => { this.selectGroup(); }}
      />
    );
  }

  renderUser(user) {
    const { UserStore } = this.props;
    return (
      <UserIconName key={user.key} user={UserStore.getUser(user.key)} />
    );
  }

  render() {
    const { group, wrapperStyles } = this.props;

    return (
      <View style={[screenStyles.wrapper, wrapperStyles]}>

        <View style={utilsStyles.level}>
          <Text style={screenStyles.groupText}>
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

const screenStyles = StyleSheet.create({
  wrapper: {
    height: 136,
  },
  groupText: {
    marginBottom: 26,
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
});
