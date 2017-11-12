import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button, Image,ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert, ListView, RefreshControl, AsyncStorage } from 'react-native'
const Dimensions = require('Dimensions');
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Header } from 'react-native-elements'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height


image = {
    Bahen: '../img/bahen.jpg',
    Gerstein: '../img/gerstein.jpg',
    Robarts: '../img/robarts.jpeg',
    Other: '../img/weather.png'
}

var REQUEST_URL = 'http://100.65.116.32:3000/get_rooms'

export default class LandingProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: [],
      info: [],
      index: 0,
      loaded: false,
    }
    this.fetchFavorites();
    console.log(this.state.room);
  }

  async fetchFavorites() {
      try {
        const values = await AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
     // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            this.state.room.push(value);
            });
          });
        });

      } catch (error) {console.log(error)}
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        for (i = 0; i< responseData.length; i++) {
          console.log(responseData[i]);
          if (this.state.room.indexOf(responseData[i].name) != -1) {
            //setting img_url
            var imgURL = image.Other;
            if (responseData[i].name[0] + responseData[i].name[1] == "BA") {
                imgURL = image.Bahen;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "Ge") {
                imgURL = image.Gerstein;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "RB") {
                imgURL = image.Robarts;
            }
            
            
            if (this.props.navigation.state.params) {
                if (this.props.navigation.state.params.name == responseData[i].name) {
                this.setState({index: i});
                }
            }

            this.setState({
                info: this.state.info.concat([{name: responseData[i].name,
                                            cap: responseData[i].max_capacity,
                                           cur: responseData[i].current_occupancy,
                                            img: imgURL,
                                        }]),
            });
          }
        }
        console.log("done fetching!");
        this.setState({loaded: true,});
        console.log(this.state);
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderSwiper();
  }

  
    
  renderLoadingView() {
    return (
    <View style={styles.loading}>
      <StatusBar barStyle="light-content" />
        <Header
          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
color: '#fff', fontWeight: 'bold'} }}
          outerContainerStyles={{ backgroundColor: '#28B490' }}
        />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Loading...
        </Text>
      </View>
    </View>
    );
  }


  renderSwiper() {
    let slides = [];
    const { navigate } = this.props.navigation;
    
    for (i = 0; i < this.state.info.length; i++) {
        slides.push(<View key={i} style={styles.slide}>
                        
                        <Image source={ require(this.state.info[i].img)} style={styles.image} />
                        <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{this.state.info[i].name}</Text>
                        </View>
                        
                        <View style={styles.textWrapper}>
                        <Text style={styles.text}>{this.state.info[i].cur}/{this.state.info[i].cap}</Text>
                        </View>
                        
                     </View>
                     );
    }
      
      
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Swiper style={styles.wrapper} index={this.state.index}
              dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} /> }
              activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
              paginationStyle={{
                bottom: 70
              }}
              loop={true}>
        
              {slides}
        
            </Swiper>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => navigate('List')}>
                    <Ionicons name={'ios-list'} size={45} style={{ color: 'white', backgroundColor: 'transparent' }} />
                </TouchableOpacity>
            </View>
        </View>
    
    );  
  }
    
//  render() {
//    const { navigate } = this.props.navigation;
//    return (
//      <ImageBackground source={ require('../img/gerstein.jpg') } style={styles.container}>
//        <View style={styles.overlay}/>
//        <StatusBar barStyle="light-content" />
//      	<View style={styles.titleWrapper}>
//        <Text style={styles.title}>Gerstein</Text>
//        </View>
//        <View style={styles.textWrapper}>
//        <Text style={styles.text}>55/120</Text>
//        </View>
//        
//        <View style={styles.menu}>
//            <TouchableOpacity onPress={() => navigate('List')}>
//                <Ionicons name={'ios-list'} size={45} style={{ color: 'white', backgroundColor: 'transparent' }} />
//            </TouchableOpacity>
//        </View>
//      </ImageBackground>
//    );
//  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    left: 0,
    height: height,
    width: width,
    backgroundColor: '#00000099',
  },

  image: {
    position: 'absolute',
    height: height,
    width: width,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  titleWrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: 60,
  },

  title: {
    backgroundColor: 'transparent',
  	color: 'white',
  	fontSize: 30,
  	fontWeight: 'normal',
    textAlign: 'center',
  },

  textWrapper: {
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  text: {
    backgroundColor: 'transparent',
  	color: 'white', 
  	fontSize: 25,
  	fontWeight: 'normal',
    textAlign: 'center',
  },

  menu: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingRight: 30,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
