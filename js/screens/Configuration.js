import React from 'react';
import { Button, Container, Content, Text } from 'native-base';

import { onSignOut } from '@/auth';

export default class Configuration extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <Button bordered danger onPress={() => onSignOut().then(() => navigate('SignedOut'))}>
            <Text>Cerrar Sesión</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
