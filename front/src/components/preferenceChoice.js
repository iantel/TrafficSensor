//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const PreferenceChoice = (props) => {
  const {onMove, checkMove, initialX, initialY} = props;

  return (
    <View style={{backgroundColor:'red', position:'absolute', left:initialX, top:initialY}} />
  );
};

PreferenceChoice.defaultProps = {
  text: 'Button Text',
  // eslint-disable-next-line no-console
  followed: false
};



export default PreferenceChoice;
