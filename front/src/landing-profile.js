import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button, Image,ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert, ListView, RefreshControl, AsyncStorage } from 'react-native'
const Dimensions = require('Dimensions');
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Header } from 'react-native-elements'
import api from './network/api.js'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
import { BlurView, VibrancyView } from 'react-native-blur';


image = {
    Bahen: require('../img/bahen.jpg'),
    Gerstein: require('../img/gerstein.jpg'),
    Robarts: require('../img/robarts.jpeg'),
    Other: require('../img/weather.png')
}


export default class LandingProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {},
      info: [],
      index: 0,
      loaded: false,
    }
    this.fetchFavorites();
  }

  async fetchFavorites() {
      try {
        const values = await AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
     // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            this.state.room[key] = value;
            });
          });
        });

      } catch (error) {console.log(error)}
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(api.apiGetRoomsURL)
      .then((response) => response.json())
      .then((responseData) => {
        for (i = 0; i< responseData.length; i++) {
          if (responseData[i].name in this.state.room) {
            //setting img_url
            var img = image.Other;
            if (responseData[i].name[0] + responseData[i].name[1] == "BA") {
                img = image.Bahen;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "Ge") {
                img = image.Gerstein;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "RB") {
                img = image.Robarts;
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
                                            image: responseData[i].image,
                                        }]),
            });
          }
        }
        this.setState({loaded: true,});
      })
      .done();
  }

  render() {
    if(this.state.loaded) {
      return this.renderSwiper();
    }
    return this.renderLoadingView()
  }



  renderLoadingView() {
    return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <Header
          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
color: '#fff', fontWeight: 'bold'} }}
          outerContainerStyles={{ backgroundColor: '#28B490' }}
        />
      <View style={styles.loading}>
        <Text>
          Loading...
        </Text>
      </View>
    </View>
    );
  }


  renderSwiper() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Swiper style={styles.wrapper} index={this.state.index}
              dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} /> }
              activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
              paginationStyle={{bottom: 70}}
              loop={true}>
              {this.state.info.map((item) => {
                return (
                  <View key={i} style={styles.slide}>
                      <Image source={{uri: api.apiURL + item.image}} style={styles.image} />
                      <BlurView
                        style={styles.image}
                        blurType="prominent"
                        blurAmount={8}
                      />
                      <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.name}</Text>
                      </View>
                      <View style={styles.textWrapper}>
                        <Text style={styles.text}>{item.cur}/{item.cap}</Text>
                      </View>
                  </View>
                )
              })
              }
            </Swiper>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => navigate('List')}>
                    <Ionicons name={'ios-list'} size={45} style={{ color: 'white', backgroundColor: 'transparent' }} />
                </TouchableOpacity>
            </View>
        </View>

    );
  }

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
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
});
