import React from "react";
import { Image, StatusBar, View } from "react-native";
import { Button, Container, Content, Icon, Input, Item, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { onSignIn } from "@/auth";
import styles from "@styles/signin";
import sarooStyles from "@styles/saroo";

const SarooLogo = require('@assets/saroo-logo.png') 

export default class SignIn extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
 
    return (
      <Container style={sarooStyles.container}>
        <StatusBar barStyle="light-content" />
        <Grid>
          <Row style={styles.logoContainer} size={5}>
            <Image source={SarooLogo} style={styles.logo} />
          </Row>
          <Row style={styles.fieldsContainer} size={2}>
            <Col>
              <Item style={styles.field}>
                <Icon name="md-person" />
                <Input keyboardType="email-address" placeholder="Ingrese su correo" />
              </Item>
              <Item style={styles.field}>
                <Icon name="md-lock" />
                <Input secureTextEntry placeholder="Contraseña"/>
              </Item>
              <Button style={styles.loginButton} block
                onPress={() => onSignIn().then(() => navigate("SignedIn"))}
              >
                <Text>Ingresar</Text>
              </Button>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col style={styles.socialButtonWrapper}>
              <Button rounded light style={styles.socialButton}>
                <Icon name="logo-facebook" style={styles.facebookButton}/>
              </Button>
              <Button rounded light style={styles.socialButton}>
                <Icon name="logo-google" style={styles.googleButton}/>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    )
  }
}
