//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const FavoriteButton = (props) => {
  const { text, onpress, followed } = props;
  return (
    <TouchableOpacity style={{flex:1}} onPress={onpress}>
    <Ionicons
      name={followed ? 'ios-heart': 'ios-heart-outline'}
      size={30}
      style={{
       flexDirection:'row',
       top:10,
       flex:1
      }}

    /></TouchableOpacity>

  );
};

FavoriteButton.defaultProps = {
  text: 'Button Text',
  // eslint-disable-next-line no-console
  followed: false
};



export default FavoriteButton;
