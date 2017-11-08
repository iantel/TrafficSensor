import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'

  
export default class RootComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<SearchBar noIcon lightTheme round placeholder='Search' />
        <Text style={styles.title}>Hello World!</Text>
        <Text style={styles.text}>Powered by React Native</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28B490',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
  	color: 'white', 
  	fontSize: 42,
  	fontWeight: 'bold',
  },

  text: {
  	color: 'white',
  	fontWeight: 'normal',
  }
});