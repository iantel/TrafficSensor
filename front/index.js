//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image} from 'react-native'
import { TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'


import Landing from './src/landing.js'
import Search from './src/search.js'
import Settings from './src/settings.js'

const serverURL = 'http://100.65.116.32:3000/';

const Footer = TabNavigator({

  Landing: {
    screen: Landing,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'md-home' : 'ios-home-outline'}
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'md-search' : 'ios-search-outline'}
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'md-settings' : 'ios-settings-outline'}
          size={30}
          style={{ color: tintColor }}
        />
      ),
    },
  },

}, {
    animationEnabled: false,
    tabBarOptions: {
        activeTintColor: '#3A4245',
        showLabel: false,
    },

});


AppRegistry.registerComponent('helloWorld', function() {
	return Footer;
})
