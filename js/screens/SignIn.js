import React from 'react';
import { Alert, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button, Container, Icon, Input, Item, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from '@styles/sarooStyles';
import signinstyles from '@styles/signinStyles';
import utilsStyles from '@styles/utilsStyles';

import { signInWithEmail } from '@/auth';
import { PRIMARY_COLOR } from '../styles/variables';

const SarooLogo = require('@assets/saroo-logo.png');

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
  }

  onLoginClick = () => {
    const { navigation } = this.props;
    const { email, password } = this.state;

    this.setState({ loading: true });

    signInWithEmail(email, password)
      .then(() => navigation.navigate('SignedIn'))
      .catch(() => Alert.alert('Datos incorrectos!'))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={utilsStyles.flex}>
        <Spinner visible={loading} />
        <Container style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Grid>
            <Row style={signinstyles.logoContainer} size={15}>
              <Image source={SarooLogo} style={signinstyles.logo} />
            </Row>
            <Row style={signinstyles.fieldsContainer} size={4}>
              <Col>
                <Item style={signinstyles.field}>
                  <Icon style={styles.icon} name="md-person" />
                  <Input
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Ingrese su correo"
                    placeholderTextColor={PRIMARY_COLOR}
                    underlineColorAndroid={PRIMARY_COLOR}
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    ref={(input) => { this.emailInput = input; }}
                    onSubmitEditing={() => this.passwordInput._root.focus()}
                  />
                </Item>
                <Item style={signinstyles.field}>
                  <Icon style={styles.icon} name="md-lock" />
                  <Input
                    secureTextEntry
                    placeholder="Contraseña"
                    placeholderTextColor={PRIMARY_COLOR}
                    underlineColorAndroid={PRIMARY_COLOR}
                    style={styles.input}
                    onChangeText={password => this.setState({ password })}
                    ref={(input) => { this.passwordInput = input; }}
                    onSubmitEditing={() => this.passwordInput._root.blur()}
                  />
                </Item>
                <Button
                  style={styles.button}
                  block
                  onPress={this.onLoginClick}
                >
                  <Text style={styles.buttonText} uppercase={false}>Ingresar</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
