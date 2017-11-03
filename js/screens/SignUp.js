import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { onSignIn } from '../auth';

export default function ({ navigation }) {
  return (
    <View style={{ paddingVertical: 20 }}>
      <Text>Email</Text>
      <TextInput placeholder="Email address..." />
      <Text>Password</Text>
      <TextInput secureTextEntry placeholder="Password..." />
      <Text>Confirm Password</Text>
      <TextInput secureTextEntry placeholder="Confirm Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => {
          onSignIn().then(() => navigation.navigate('SignedIn'));
        }}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="transparent"
        textStyle={{ color: '#bcbec1' }}
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}
