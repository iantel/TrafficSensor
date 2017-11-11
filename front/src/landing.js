import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Image } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LandingList from './landing-list.js'
import LandingProfile from './landing-profile.js'



const LandingPage = StackNavigator({
  Profile: { screen: LandingProfile },
  List: { screen: LandingList},
  }, {
   headerMode: 'none',
   mode: 'modal',
   navigationOptions: {
     gesturesEnabled: false,
   },
});


export default class Landing extends Component {

  render() {
    return (
      <View style={styles.container}>
        <LandingPage navigation={this.props.navigation}/>
      </View>
    );
  }
}
Landing.router = LandingPage.router;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});