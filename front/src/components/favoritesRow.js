//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const FavoriteRow = (props) => {
  const { roomName, onpress, capacity, occupied} = props;
  return (
    <TouchableOpacity style={{flex:1, height:90, backgroundColor:'blue', justifyContent: 'center', flexDirection:'row'}} onPress={onpress}>
      <Text style={{fontSize:25, flex: 3, top: 15, backgroundColor:'transparent', color:'white', left:15}}>
        {roomName}
      </Text>
      <Text style={{fontSize:25, flex: 1, top: 15, backgroundColor:'transparent', color:'white', left:15}}>
        {occupied}/{capacity}
      </Text>
    </TouchableOpacity>

  );
};




export default FavoriteRow;
