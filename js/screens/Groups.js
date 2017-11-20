import React from 'react';
import { StatusBar, ScrollView, Text, View } from 'react-native';
import { Button, Container } from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import GroupOverview from '@components/groups/GroupOverview';

// Styles
import styles from '@styles/sarooStyles';
import groupsStyles from '@styles/groupsStyles';

// Lib
import { inject, observer } from 'mobx-react';

@inject('MainStore')
@inject('GroupStore')
@observer
export default class Groups extends React.Component {
  otherGroups() {
    const { groups, selectedGroupKey } = this.props.GroupStore;
    return groups.filter(group => group.key !== selectedGroupKey);
  }

  renderGroup = group =>
    <GroupOverview key={group.key} wrapperStyles={groupsStyles.groupWrapper} group={group} />;

  renderNormal() {
    const { GroupStore } = this.props;

    return (
      <View>
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
      </View>
    );
  }

  renderEmpty = () => (
    <View>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Otros Grupos</Text>
      <Text>Cargando...</Text>
    </View>
  )

  render() {
    const { GroupStore, MainStore } = this.props;

    return (
      <Container style={styles.container}>
        <Spinner visible={MainStore.isLoading} />
        { GroupStore.selectedGroup ? this.renderNormal() : this.renderEmpty() }
      </Container>
    );
  }
}
