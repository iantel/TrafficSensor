//import the dependencies
import React, {Component} from 'react'
import { View, Text, AppRegistry, Image, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class FavoriteButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isFollowed: this.props.followed,
      loaded: false
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(){
    this.setState({
      isFollowed: !this.state.isFollowed
    })
    this.props.onpress()
  }
  render() {
    return (
      <TouchableOpacity style={{flex:1, backgroundColor:'transparent'}} onPress={()=>this.onClick()}>
      <Ionicons
        name={this.props.followed ? 'ios-heart': 'ios-heart-outline'}
        size={30}
        style={{
         flexDirection:'row',
         top:10,
         flex:1
        }}

      /></TouchableOpacity>

    );
  }
}




export default FavoriteButton;
