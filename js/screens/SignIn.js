import React from 'react';
import { Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from '@styles/signinStyles';
import sarooStyles from '@styles/sarooStyles';
import utilsStyles from '@styles/utilsStyles';

const SarooLogo = require('@assets/saroo-logo.png');

export default class SignIn extends React.Component {
  onLoginClick = () => {
    const { navigation } = this.props;

    this.onSignIn()
      .then(() => navigation.navigate('SignedIn'));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={utilsStyles.flex}>
        <Container style={sarooStyles.container}>
          <StatusBar barStyle="light-content" />
          <Grid>
            <Row style={styles.logoContainer} size={15}>
              <Image source={SarooLogo} style={styles.logo} />
            </Row>
            <Row style={styles.fieldsContainer} size={4}>
              <Col>
                <Item style={styles.field}>
                  <Icon name="md-person" />
                  <Input keyboardType="email-address" placeholder="Ingrese su correo" />
                </Item>
                <Item style={styles.field}>
                  <Icon name="md-lock" />
                  <Input secureTextEntry placeholder="Contraseña" />
                </Item>
                <Button
                  style={styles.button}
                  block
                  onPress={this.onLoginClick}
                >
                  <Text uppercase={false}>Ingresar</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
