import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Image,AsyncStorage } from 'react-native';
import { SearchBar, Header } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { ListView } from 'react-native'
import { RefreshControl } from 'react-native'
import FavoriteRow from './components/favoritesRow'
export default class LandingList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        refreshing: false,
        dataSource: ds.cloneWithRows([1,2,3]),
        followed:[],
        loaded:false
    }
    this.updateFollowed = this.updateFollowed.bind(this);
    this.updateFollowed();
  }

  async updateFollowed(){
     try {
       var results = []
       const values = await AsyncStorage.getAllKeys((err, keys) => {
         AsyncStorage.multiGet(keys, (err, stores) => {
           stores.map((result, i, store) => {
             let key = store[i][0];
             let value = store[i][1];
             results.push(value);
           });
           const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             followed: results,
             dataSource: ds.cloneWithRows(results),
             refreshing: false
           });
           console.log(results)
         });
       });

     } catch (error) {console.log(error)}
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.updateFollowed();
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <StatusBar barStyle="light-content" />
        <ListView
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <FavoriteRow roomName = {rowData} onpress={() => navigate('Profile', {name: rowData})}  capacity={50} occupied={10}/>
          }
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
