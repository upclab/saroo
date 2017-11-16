import React from 'react';
import { Alert, Image, StatusBar } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { onSignIn, signInWithFacebook, signInWithGoogle } from '@/auth';
import styles from '@styles/signin';
import sarooStyles from '@styles/saroo';

const SarooLogo = require('@assets/saroo-logo.png');

export default class SignIn extends React.Component {
  onLoginClick = () => {
    const { navigation } = this.props;

    onSignIn()
      .then(() => navigation.navigate('SignedIn'));
  }

  onFacebookClick = () => {
    const { navigation } = this.props;

    signInWithFacebook()
      .then(() => navigation.navigate('SignedIn'))
      .catch(() => Alert.alert('¡No se pudo conectar con Facebook!'));
  }

  onGoogleClick = () => {
    const { navigation } = this.props;

    signInWithGoogle()
      .then(() => navigation.navigate('SignedIn'))
      .catch(() => Alert.alert('¡No se pudo conectar con Google!'));
  }

  render = () => {
    const { navigation } = this.props;

    return (
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
                style={styles.loginButton}
                block
                onPress={this.onLoginClick}
              >
                <Text>Ingresar</Text>
              </Button>
              <Text style={styles.loginActionsText}>¿Olvidaste tu contraseña?</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col style={styles.socialButtonWrapper}>
              <Button
                rounded
                light
                style={styles.socialButton}
                onPress={this.onFacebookClick}
              >
                <Icon name="logo-facebook" style={styles.facebookButton} />
              </Button>
              <Button
                rounded
                light
                style={styles.socialButton}
                onPress={this.onGoogleClick}
              >
                <Icon name="logo-google" style={styles.googleButton} />
              </Button>
            </Col>
          </Row>
          <Row size={0.5}>
            <Col style={styles.signUpTextWrapper}>
              <Button transparent primary onPress={() => navigation.navigate('SignUp')}>
                <Text>Registrarse</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
