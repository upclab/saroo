import React from 'react';
import { Text, StatusBar, ScrollView } from 'react-native';
import { Container, Button } from 'native-base';

import GroupOverview from '@components/groups/GroupOverview';

// Styles
import styles from '@styles/sarooStyles';
import groupsStyles from '@styles/groupsStyles';

// Lib
import { inject, observer } from 'mobx-react';

@inject('GroupStore')
@observer
export default class Groups extends React.Component {
  renderGroup = (group) => {
    const { GroupStore } = this.props;

    if (group.key === GroupStore.selectedGroupKey) {
      return null;
    }
    return (
      <GroupOverview key={group.key} wrapperStyles={groupsStyles.groupWrapper} group={group} />
    );
  }

  render() {
    const { GroupStore } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Otros Grupos</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={groupsStyles.content}>
          {GroupStore.groups.map(this.renderGroup)}
        </ScrollView>

        <Button block light style={styles.button}>
          <Text style={styles.buttonText}>
            Nuevo Grupo
          </Text>
        </Button>
      </Container>
    );
  }
}
