import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Image } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'

  
export default class LandingList extends Component {

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
        <Text style={styles.title}>Landing list!</Text>
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});