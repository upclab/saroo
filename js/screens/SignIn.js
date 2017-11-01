import React from "react";
import { View, Button, TextInput, Text } from "react-native";
import { onSignIn } from "../auth";

export default class SignIn extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
 
    return (
      <View style={{ paddingVertical: 20 }}>
          <Text>Email</Text>
          <TextInput placeholder="Email address..." />
          <Text>Password</Text>
          <TextInput secureTextEntry placeholder="Password..." />
  
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => {
              onSignIn().then(() => navigate("SignedIn"));
            }}
          />
      </View>
    )
  }
}
