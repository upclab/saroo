import React from 'react';
import { View }  from 'react-native';
import styles from '@styles/savings';

export default class Divider extends React.Component {
    render() {
        return (
            <View
            style={{
              borderBottomColor: '#A8A8A8',
              borderBottomWidth: 1,
              marginTop: 9,
            }}
            />
        )
    }

}

