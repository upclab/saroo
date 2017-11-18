import React from 'react';
import { Text, StatusBar, ScrollView } from 'react-native';
import { Container, Button } from 'native-base';

import GroupOverview from '@components/groups/GroupOverview';

import { db } from '@/firebaseApp';

// Styles
import styles from '@styles/sarooStyles';
import groupsStyles from '@styles/groupsStyles';

// Lib
import { snapshotToArray } from '@/utilities/firebaseUtils';

export default class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    db.ref('groups').on('value', (snapshot) => {
      this.setState({ groups: snapshotToArray(snapshot) });
    });
  }

  renderGroup = group => <GroupOverview key={group.key} wrapperStyles={groupsStyles.groupWrapper} group={group} />

  render() {
    const { groups } = this.state;

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={groupsStyles.title}>Grupos</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={groupsStyles.content}>
          {groups.map(this.renderGroup)}
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
