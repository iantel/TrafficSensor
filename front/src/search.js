import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'

  
export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
color: '#fff', fontWeight: 'bold'} }}
          outerContainerStyles={{ backgroundColor: '#28B490' }}
        />
      	<View style={styles.titleWrapper}>
        <Text style={styles.title}>Search</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  title: {
  	color: 'black', 
  	fontSize: 24,
  	fontWeight: 'normal',
    textAlign: 'center',
  },
});