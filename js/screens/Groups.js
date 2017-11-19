import React from 'react';
import { StatusBar, ScrollView, Text, View } from 'react-native';
import { Button, Container } from 'native-base';

import GroupOverview from '@components/groups/GroupOverview';

// Styles
import styles from '@styles/sarooStyles';
import groupsStyles from '@styles/groupsStyles';

// Lib
import { inject, observer } from 'mobx-react';

@inject('GroupStore')
@observer
export default class Groups extends React.Component {
  otherGroups() {
    const { groups, selectedGroupKey } = this.props.GroupStore;
    return groups.filter(group => group.key !== selectedGroupKey);
  }

  renderGroup = group =>
    <GroupOverview key={group.key} wrapperStyles={groupsStyles.groupWrapper} group={group} />;

  render() {
    const { GroupStore } = this.props;

    if (GroupStore.selectedGroup) {
      return (
        <Container style={styles.container}>
          <StatusBar barStyle="dark-content" />
          
          <View style={groupsStyles.defaultGroup}>
            <GroupOverview
              group={GroupStore.selectedGroup}
            />
          </View>

          <Text style={styles.title}>Otros Grupos</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.otherGroups().map(this.renderGroup)}
          </ScrollView>

          <Button block light style={styles.button}>
            <Text style={styles.buttonText}>
              Nuevo Grupo
            </Text>
          </Button>
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Otros Grupos</Text>
        <Text>Cargando...</Text>
      </Container>
    );
  }
}
