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
     gesturesEnabled: false,
   },
   transitionConfig: TransitionConfiguration
});

let MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const outputRange = [.8, 50, 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange,
    });

    const scaleY = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
    transitionSpec: MyTransitionSpec,
    opacity,
        transform: [
            {scaleY}
        ]
    };
};

const MyTransitionSpec = ({
    duration: 2000,
    easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
    timing: Animated.timing,
});

let TransitionConfiguration = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps;
            const {index} = scene;

            return MyTransition(index, position);
        }
    }
};


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
