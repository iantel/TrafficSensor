import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button, Image,ImageBackground, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Header } from 'react-native-elements'

  
var REQUEST_URL = http://100.65.116.32:3000/get_rooms

export default class LandingProfile extends Component {
    
  constructor(props) {
    super(props) 
    this.state = {
      movies: null,
    }
  }
    
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
    
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
    
  renderProfile() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../img/gerstein.jpg')} style={styles.container}>
        <View style={styles.overlay}/>
        <StatusBar barStyle="light-content" />
        <Header
          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
color: '#fff', fontWeight: 'bold'} }}
          outerContainerStyles={{ backgroundColor: '#28B490' }}
        />
      	<View style={styles.titleWrapper}>
        <Text style={styles.title}>Landing Profile!</Text>
        </View>
        
        <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigate('List')}>
                <Ionicons name={'ios-list'} size={45} style={{ color: 'white', backgroundColor: 'transparent' }} />
            </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',  
  },
    
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#606060',
    opacity: 0.75,
  },

  titleWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  title: {
    backgroundColor: 'transparent',
  	color: 'white', 
  	fontSize: 24,
  	fontWeight: 'normal',
    textAlign: 'center',
  },
    
  menu: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingRight: 30,
  },
});