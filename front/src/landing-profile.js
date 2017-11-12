import React, {Component, Dimensions} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Button, Image,ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert, ListView, RefreshControl, AsyncStorage } from 'react-native'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Header } from 'react-native-elements'


image = {
    Bahen: require('../img/bahen.jpg'),
    Gerstein: require('../img/gerstein.jpg'),
    Robarts: require('../img/robarts.jpeg'),
    Other: require('../img/weather.png')
}

var REQUEST_URL = 'http://100.65.116.32:3000/get_rooms' 

export default class LandingProfile extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      room: [],
      info: [],
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
            var img = image.Other;
            if (responseData[i].name[0] + responseData[i].name[1] == "BA") {
                img = image.Bahen;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "Ge") {
                img = image.Gerstein;
            } else if (responseData[i].name[0] + responseData[i].name[1] == "RB") {
                img = image.Robarts;
            }
              
            this.setState({
                info: this.state.info.concat([{name: responseData[i].name, 
                                            cap: responseData[i].max_capacity, 
                                           cur: responseData[i].current_occupancy,
                                            image: img,
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
//    
//  render() {
//    if (!this.state.loaded) {
//      return this.renderLoadingView();
//    }
//
//    return this.renderSwiper();
//  }
//
//  renderLoadingView() {
//    return (
//    <View>
//      <StatusBar barStyle="light-content" />
//        <Header
//          centerComponent={{ text: 'RoomFinder', style: { fontSize: 19,
//color: '#fff', fontWeight: 'bold'} }}
//          outerContainerStyles={{ backgroundColor: '#28B490' }}
//        />
//      <View style={styles.loading}>
//        <Text>
//          Loading...
//        </Text>
//      </View>
//    </View>
//    );
//  }
//
//
//  renderSwiper() {
//    let slides = [];
//    const { navigate } = this.props.navigation;
//    
//    for (i = 0; i < 3; i++) {
//        slides.push(<View key={i} style={styles.slide}>
//                    <View  style={styles.container}>
//                        <View style={styles.overlay}/>
//                        <Image source={ require('../img/gerstein.png')} style={styles.image} />
//                        
//                        <StatusBar barStyle="light-content" />
//                            
//                        <View style={styles.titleWrapper}>
//                        <Text style={styles.title}>{this.state.info[i].name}</Text>
//                        </View>
//                        
//                        <View style={styles.textWrapper}>
//                        <Text style={styles.text}>1/10</Text>
//                        </View>
//                        
//                     </View>
//                     </View>
//                     );
//    }
//      
//      
//    return (
//        
//        <View style={styles.container}>
//            <Swiper style={styles.wrapper}
//          dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} /> }
//          activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
//          paginationStyle={{
//            bottom: 70
//          }}
//          loop={false}>
//                {slides}
//            </Swiper>
//            <View style={styles.menu}>
//                <TouchableOpacity onPress={() => navigate('List')}>
//                    <Ionicons name={'ios-list'} size={45} style={{ color: 'white', backgroundColor: 'transparent' }} />
//                </TouchableOpacity>
//            </View>
//        </View>
//    
//    );  
//  }
//    
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={ require('../img/gerstein.jpg') } style={styles.container}>
        <View style={styles.overlay}/>
        <StatusBar barStyle="light-content" />
      	<View style={styles.titleWrapper}>
        <Text style={styles.title}>Gerstein</Text>
        </View>
        <View style={styles.textWrapper}>
        <Text style={styles.text}>55/120</Text>
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
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#606060',
    opacity: 0.9,
  },

  image: {
    position: 'absolute',
    height: 687,
    width: 376,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  titleWrapper: {
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
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  text: {
    backgroundColor: 'transparent',
  	color: 'white', 
  	fontSize: 20,
  	fontWeight: 'normal',
    textAlign: 'center',
  },
    
  menu: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingRight: 30,
    height: 20,
  },
});