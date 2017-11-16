//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, AsyncStorage} from 'react-native'
import { TabNavigator ,StackNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'


import Landing from './src/landing.js'
import Search from './src/search.js'
import Settings from './src/settings.js'
import Preference from './src/preference.js'


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

class main extends Component {
  static navigationOptions = {
    title: 'Preferences',
  }
  constructor(props) {
    super(props)
     this.state = {
        isLoaded: false,
        wasShown: false
     }
  }

  componentDidMount() {
     AsyncStorage.getItem('isFirstTime') // get key
       .then(wasShown => {
           if(wasShown === null) { // first time
             // we need to save key for the next time
             AsyncStorage.setItem('isFirstTime', '"true"')
           }
           this.setState({isLoaded: true, wasShown})
        })
    }

  render() {
    return <Preference navigation={ModalStack}/>
    const { isLoaded, wasShown } = this.state

    // you can't tell if this component was shown or not render nothing
    if(!isLoaded) { return null }

    if(!wasShown) {
      return <Preference />
    } else {
      return <Footer />
    }


  }
}

// const ModalStack = StackNavigator({
//   Preference: {
//     screen: Preference,
//   },
//   Footer: {
//     screen: Footer,
//   }
// },{
//     headerMode: 'null'
//
//   });



AppRegistry.registerComponent('helloWorld', function() {
	return Footer;
})
