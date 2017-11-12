import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
import PreferenceChoice from './components/preferenceChoice'
const Dimensions = require('Dimensions');

export default class Preference extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{}} />
      </View>
      // <Button
      //   onPress={()=>this.props.navigation.navigate('Footer')}
      //   title="Landingff"
      // />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red'
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
  }
});
