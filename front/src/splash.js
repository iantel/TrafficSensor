import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet } from 'react-native';

  
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<SearchBar
  lightTheme
  placeholder='Type Here...' />
        <Text style={styles.text}>Hello World!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
  	fontSize: 42,
  	fontWeight: 'bold',
  }
});