//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Dimensions = require('Dimensions');

const FavoriteRow = (props) => {
  const { roomName, onpress, capacity, occupied, image} = props;
  var prodURL = 'https://lit-brook-11855.herokuapp.com';
  var devURL = "http://192.168.0.17:3000";
  var photoURL = devURL + props.image
  var width = Dimensions.get('window').width
  console.log(photoURL)
  return (
      <TouchableOpacity style={{flex:1, height:90, justifyContent: 'center', flexDirection:'row'}} onPress={onpress}>
        <Image source={{uri: photoURL}} style={{flex:1,position:'absolute', height:90, width:width, backgroundColor:'blue'}} />
        <Text style={{fontSize:25, top: 15, backgroundColor:'transparent', color:'white', left:15,position:'absolute'}}>
          {roomName}
        </Text>
        <Text style={{fontSize:25, right:20, top: 15, backgroundColor:'transparent', color:'white',position:'absolute'}}>
          {occupied}/{capacity}
        </Text>
      </TouchableOpacity>



  );
};




export default FavoriteRow;
