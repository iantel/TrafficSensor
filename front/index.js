//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image} from 'react-native'
import { TabNavigator } from 'react-navigation'

  
import Preference from './src/preference.js'
import Landing from './src/landing.js'
import Search from './src/search.js'

const Footer = TabNavigator({
  Preference: {
    screen: Preference,
    navigationOptions: {
      tabBarLabel: 'Preference',
      tabBarIcon: () => (
      	<View style={{alignItems: 'center', justifyContent: 'center'}}>
        	<Image style={{width: 30, height: 30}} source={require('./img/home.png')} />
        </View>
      ),
    },
  },

  Landing: {
    screen: Landing,
    navigationOptions: {
      tabBarLabel: 'Landing',
      tabBarIcon: () => (
      	<View style={{alignItems: 'center', justifyContent: 'center'}}>
        	<Image style={{width: 30, height: 30}} source={require('./img/settings.png')} />
        </View>
      ),
    },
  },

  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => (
      	<View style={{alignItems: 'center', justifyContent: 'center'}}>
        	<Image style={{width: 30, height: 30}} source={require('./img/search-filled.png')} />
        </View>
      ),
    },
  },

});


AppRegistry.registerComponent('helloWorld', function() {
	return Footer;
})
