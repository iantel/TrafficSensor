import React, {Component} from 'react';
import {   Animated,Easing,View, Text, AppRegistry, StyleSheet, StatusBar, Image } from 'react-native';
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
   navigationOptions: {
     mode : 'modal',
     gesturesEnabled: false,
   }
});

const prevGetStateForAction = LandingPage.router.getStateForAction;

LandingPage.router = {
  ...LandingPage.router,
  getStateForAction(action, state){
    if(state && action.type == 'ReplaceCurrentScreen'){
      console.log("1")
      for (var i in state.routes) {
        console.log(state.routes[i])
      }
      const routes = state.routes.slice(0, state.routes.length - 2);
      console.log("2")
      for (var i in routes) {
        console.log(routes[i])
      }
      routes.push(action);
      console.log("3")
      for (var i in routes) {
        console.log(routes[i])
      }
      return {
        ...state,
        routes,
        index:routes.length - 1,
      }
    }
    return prevGetStateForAction(action, state)
  }
}





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
