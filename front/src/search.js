import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
const Dimensions = require('Dimensions');
import { TouchableWithoutFeedback } from 'react-native'
import { Alert } from 'react-native'
import { ListView } from 'react-native'
import { RefreshControl } from 'react-native'

export default class Search extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var result = [];
    this.result = ["dd", "ddss"];
    this.state = {
        searchBarWidth: Dimensions.get('window').width*0.96,
        cancelButtonHidden: true,
        searchValue: "",
        searchResult:[],
        refreshing: false,
        result: this.result,
        dataSource: ds.cloneWithRows(this.result)
    }
    this.setColor = this.setColor.bind(this);
    this.searchBarOnClick = this.searchBarOnClick.bind(this);
    this.searchBarOnReturn = this.searchBarOnReturn.bind(this);
    this.overlayOnTouch = this.overlayOnTouch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    fetch('http://100.65.116.32:3000/get_rooms').then((response) =>
      response.json()).then((responseJson) => {
        var results = [];
        for(var i in responseJson){
          results.push(responseJson[i]['name']);
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            result: results.concat(),
            dataSource: ds.cloneWithRows(results.concat())
        });
      }).catch((error) => {
        Alert.alert(error);
      });


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
    fetch('http://100.65.116.32:3000/get_rooms').then((response) =>
      response.json()).then((responseJson) => {
        var results = [];
        for(var i in responseJson){
          results.push(responseJson[i]['name']);
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            result: results.concat(),
            dataSource: ds.cloneWithRows(results.concat())
        });
      }).catch((error) => {
        Alert.alert(error);
      }).then(() => {
      this.setState({refreshing: false});
    });
  }

  updateSearch(text){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(text == ""){
      this.setState({
          dataSource: ds.cloneWithRows(this.state.result),
      })
      return;
    }
    var results = [];
    console.log(this.state.result);
    for (var i = 0; i < this.state.result.length; i++){
      if (this.state.result[i].toLowerCase().indexOf(text.toLowerCase()) != -1 && results.indexOf(this.state.result[i]) == -1){
        results.push(this.state.result[i]);
      }

    }

    this.setState({
        searchValue: text,
        searchResult: results,
        dataSource: ds.cloneWithRows(results),
    })
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

        <ListView
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style = {styles.searchItem}>
              <Text style = {{fontSize:15, top:5}}>
                {rowData}
              </Text>
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
    justifyContent: 'center'
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
