//import the dependencies
import React, {Component} from 'react'
import { View,  StyleSheet, Text, AppRegistry, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Dimensions = require('Dimensions');
import { BlurView, VibrancyView } from 'react-native-blur';
let width = Dimensions.get('window').width
import api from '../network/api.js'

const FavoriteRow = (props) => {
  const { roomName, onpress, capacity, occupied, image} = props;
  var photoURL = api.apiURL + props.image

  return (
      <TouchableOpacity style={{flex:1, height:90, justifyContent: 'center', flexDirection:'row'}} onPress={onpress}>
        <Image source={{uri: photoURL}} style={styles.absolute} />
        <BlurView
          style={styles.absolute}
          blurType="prominent"
          blurAmount={2}
        />
        <Text style={{fontSize:25, top: 15, backgroundColor:'transparent', color:'white', left:15,position:'absolute'}}>
          {roomName}
        </Text>
        <Text style={{fontSize:25, right:20, top: 15, backgroundColor:'transparent', color:'white',position:'absolute'}}>
          {occupied}/{capacity}
        </Text>
      </TouchableOpacity>



  );
};

const styles = StyleSheet.create({
  absolute: {
    flex:1,
    position:'absolute',
    height:90,
    width:width
  }
});


export default FavoriteRow;
