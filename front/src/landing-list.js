import React, {Component} from 'react';
import { FlatList, View, Text, AppRegistry, StyleSheet, StatusBar, Image,AsyncStorage } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { ListView } from 'react-native'
import { RefreshControl } from 'react-native'
import FavoriteRow from './components/favoritesRow'
import api from './network/api.js'
export default class LandingList extends Component {

  static navigationOptions: {
    cardStack: {
      transitions: [
        {
          to: 'LandingProfile',
          config: { duration: 1000},
        },
      ]
    }
  }

  constructor(props) {
    super(props);
    this.state = {
        refreshing: false,
        followed:[],
        loaded:false
    }
    this.updateFollowed = this.updateFollowed.bind(this);
    this.fetchDataFor = this.fetchDataFor.bind(this);
    this.updateFollowed();
  }

  componentWillMount(){
      this.updateFollowed();
      for(var i in this.state.followed){
        this.fetchDataFor(i)
      }
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
            this.state.followed[name] = favoriteData
          });

      }).catch((error) => {console.log(error)});
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
             this.fetchDataFor(key)
           });
           this.setState({
             followed: results,
             refreshing: false
           });
         });
       });

     } catch (error) {console.log(error)}
  }


  _onRefresh() {
    this.setState({refreshing: true});
    if (this.state.followed.length == 0) {
      this.setState({refreshing: false});
    }
    this.updateFollowed()
  }


  render() {
    var followed = []
    console.log(this.state.followed)
    for (var i in this.state.followed) {
      followed.push(this.state.followed[i])
    }
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <StatusBar barStyle="light-content" />
        <FlatList
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={followed}
          renderItem={({item}) =>
            <View style = {styles.searchItem}>
                   <FavoriteRow
                     roomName = {item.name}
                     onpress={() => navigate('Profile', {name: item.name})}
                     capacity={item.max_capacity}
                     occupied={item.current_occupancy}
                     image={item.image}/>
            </View>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
