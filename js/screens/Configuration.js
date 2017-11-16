import React from 'react';
import { Button, Container, Content, Text } from 'native-base';
import { signOut } from '@/auth';

import styles from '@/styles/saroo';

export default function ({ navigation }) {
  return (
    <Container style={styles.container}>
      <Content>
        <Button bordered danger onPress={() => signOut().then(() => navigation.navigate('SignedOut'))}>
          <Text>Cerrar Sesión</Text>
        </Button>
      </Content>
    </Container>
  );
}
