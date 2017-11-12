//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Dimensions = require('Dimensions');

const FavoriteRow = (props) => {
  const { roomName, onpress, capacity, occupied} = props;
  var width = Dimensions.get('window').width
  return (

      <TouchableOpacity style={{flex:1, height:90, backgroundColor:'blue', justifyContent: 'center', flexDirection:'row'}} onPress={onpress}>
        <Image source={require('../../img/bahen.jpg')} style={{flex:1,position:'absolute', height:90, width:width}} />
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
