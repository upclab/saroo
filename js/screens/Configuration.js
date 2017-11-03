import React from 'react';
import { Button, Container, Content, Text } from 'native-base';
import { onSignOut } from '@/auth';

export default function ({ navigation }) {
  return (
    <Container>
      <Content>
        <Button bordered danger onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}>
          <Text>Cerrar Sesión</Text>
        </Button>
      </Content>
    </Container>
  );
}
