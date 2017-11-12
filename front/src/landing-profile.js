import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Header } from 'react-native-elements'


export default class LandingProfile extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
color: '#fff', fontWeight: 'bold'} }}
          outerContainerStyles={{ backgroundColor: '#28B490' }}
        />
      	<View style={styles.titleWrapper}>
        <Text style={styles.title}>Landing Profile!</Text>
        </View>

        <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigate('List')}>
                <Ionicons name={'ios-list'} size={35} style={{ color: 'black' }} />
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

  menu: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 25,
  },
});
