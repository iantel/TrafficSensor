import React, {Component} from 'react';
import {ListItem , FlatList ,View, Text, AppRegistry, StyleSheet, StatusBar ,AsyncStorage, TouchableWithoutFeedback, Alert, ListView, RefreshControl, ActivityIndicator} from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
const Dimensions = require('Dimensions');
import FavoriteButton from './components/favoriteButton.js'
import api from './network/api.js'
export default class Search extends Component {

  constructor(props) {
    super(props);
    var prodURL = 'https://lit-brook-11855.herokuapp.com/get_rooms';
    var devURL = "http://192.168.0.17:5000/get_rooms";
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        searchBarWidth: Dimensions.get('window').width*0.96,
        cancelButtonHidden: true,
        searchValue: "",
        searchResult:[],
        refreshing: false,
        result: [],
        dataSource: ds.cloneWithRows([]),
        followed:[],
        loaded:false
    }
    this.setColor = this.setColor.bind(this);
    this.searchBarOnClick = this.searchBarOnClick.bind(this);
    this.searchBarOnReturn = this.searchBarOnReturn.bind(this);
    this.overlayOnTouch = this.overlayOnTouch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.followRoom = this.followRoom.bind(this);
    this.updateFollowed = this.updateFollowed.bind(this);
    this.fetchDataFor = this.fetchDataFor.bind(this);

  }

  componentWillMount(){
      this.fetchData();
      this.updateFollowed();


  }

  async updateFollowed(){

     try {
       var results = {}
       const values = await AsyncStorage.getAllKeys((err, keys) => {
         AsyncStorage.multiGet(keys, (err, stores) => {
           stores.map((result, i, store) => {
             let key = result[0];
             let value = result[1];
             results[key] = JSON.parse(value);
           });
           this.setState({
             followed: results
           });
         });
       });

     } catch (error) {console.log(error)}
  }

  fetchData(){
    fetch(api.apiGetRoomsURL).then((response) =>
      response.json()).then((responseJson) => {
        var results = [];
        for(var i in responseJson){
          results.push(responseJson[i]['name']);
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            result: results.concat(),
            searchResult: this.state.loaded ? this.state.searchResult: results.concat(),
            dataSource: ds.cloneWithRows(results.concat()),
            refreshing: false,
            loaded: true
        });
      }).catch((error) => {
        console.log(error)
      });
  }
  
  fetchDataFor(name){
    var body = '?name=' + name
    var devURL = api.apiGetRoomsURL + body;
    fetch(String(devURL),
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) =>
        response.json()).then((responseJson) => {
          var favoriteData = responseJson[0]
          AsyncStorage.setItem(name, JSON.stringify(favoriteData), ()=>{
            this.updateFollowed();
          });

      }).catch((error) => {console.log(error)});
  }

  setColor(color) {
    this.setState({
        bColor: color
    })
  }

  searchBarOnClick(){
    this.setState({
        searchBarWidth: Dimensions.get('window').width*0.86,
        cancelButtonHidden: false
    })
  }

  searchBarOnReturn(){
    this.setState({
        searchBarWidth: Dimensions.get('window').width*0.96,
        cancelButtonHidden: true
    })
  }

  overlayOnTouch(){
    this.searchBarOnReturn();
    this.search.blur();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
  }

  updateSearch(text){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(text == ""){
      this.setState({
        searchResult: this.state.result
      })
      return;
    }
    var results = [];
    for (var i = 0; i < this.state.result.length; i++){
      if (this.state.result[i].toLowerCase().indexOf(text.toLowerCase()) != -1 && results.indexOf(this.state.result[i]) == -1){
        results.push(this.state.result[i]);
      }

    }

    this.setState({
        searchValue: text,
        searchResult: results
    })
  }

  async followRoom(name){

    try {
      if (name in this.state.followed){
        await AsyncStorage.removeItem(name, ()=>{
          this.updateFollowed();
        })
      } else {
        this.fetchDataFor(name)
      }
    } catch (error) {console.log(error)}
  }

  render() {
    let button = null;
    let overlay = null;
    if (!this.state.cancelButtonHidden){
      button = {
        color: '#ffffff', name: 'cancel', style:{top: 30}
      }
      overlay = <TouchableWithoutFeedback onPressIn={()=>this.overlayOnTouch()}>
                  <View
                    style={{backgroundColor:"#00000070"
                    , position: 'absolute'
                    , top:60
                    , left:0
                    , width: Dimensions.get('window').width
                    , height: Dimensions.get('window').height-60}}>
                  </View>
                </TouchableWithoutFeedback>

    }
    if (!this.state.loaded){
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SearchBar
          icon={
            { color: 'rgb(152, 152, 152)', name: 'search' , style:{top:30}}
          }
          ref={search => this.search = search}
          containerStyle={{
            backgroundColor: '#28B490',
            alignSelf: 'stretch',
            height:60,
            borderBottomColor: 'transparent'
          }}
          inputStyle = {{
            top: 15,
            backgroundColor: 'rgb(236, 236, 236)',
            width: this.state.searchBarWidth

          }}

          clearIcon = {button}

          onChangeText={(text) => this.updateSearch(text)}

          onFocus = {
            () => this.searchBarOnClick()
          }

          onEndEditing={() => this.searchBarOnReturn()}
          />
        <FlatList
         refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={this.state.searchResult}
          renderItem={({item}) =>
          <View style = {styles.searchItem}>
                 <Text style = {{fontSize:15, flex: 5, top: 15, backgroundColor:'transparent'}}>
                  {item}
                </Text>
                <FavoriteButton onpress={()=>this.followRoom(item)} followed={item in this.state.followed}/>
              </View>
          }
        />

        {overlay}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  searchItem: {
    alignSelf: 'stretch',
    height:50,
    left:30,
    borderBottomColor: '#47315a',
    borderBottomWidth: 0.3,
    flexDirection:'row'
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
});
