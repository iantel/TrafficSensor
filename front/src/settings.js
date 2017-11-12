import React, {Component} from 'react';
import { View, Text, AppRegistry, StyleSheet, StatusBar, Switch, Platform, TextInput, Button} from 'react-native';
import { SearchBar, Header } from 'react-native-elements'

  
export default class Settings extends Component {

  state = {
    switchValue: true
  };

  _handleToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }));

  state2 = {
    switchValue2: false
  };

  _handleToggleSwitch2 = () => this.setState(state2 => ({
    switchValue2: !state2.switchValue2
  }));

  state3 = {
    switchValue3: true
  };

  _handleToggleSwitch3 = () => this.setState(state3 => ({
    switchValue3: !state3.switchValue3
  }));

  state4 = {
    switchValue4: false
  };

  _handleToggleSwitch4 = () => this.setState(state4 => ({
    switchValue4: !state4.switchValue4
  }));

  render() {
    return (
      <View style={styles.container2}>
        <View style={[styles.box, styles.box1]}>
          <Header
            centerComponent={{ flex: 1, text: 'RoomFinder : Settings', style: { fontSize: 25,
  color: '#fff', fontWeight: 'bold'} }}
            outerContainerStyles={{ backgroundColor: '#28B490' }}
          />
        </View>
        <View style={[styles.box, styles.box2]}>

        <View style={styles.settingItems}>

          <View style={styles.item}>
            <Text style={styles.item_text}> settings 1 </Text>
            <Switch style={styles.item_switch}
              onValueChange={this._handleToggleSwitch}
              value={this.state.switchValue}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.item_text}> settings 2 </Text>
            <Switch style={styles.item_switch}
              onValueChange={this._handleToggleSwitch2}
              value={this.state2.switchValue2}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.item_text}> settings 3 </Text>
            <Switch style={styles.item_switch}
              onValueChange={this._handleToggleSwitch3}
              value={this.state3.switchValue3}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.item_text}> settings 4 </Text>
            <Switch style={styles.item_switch}
              onValueChange={this._handleToggleSwitch4}
              value={this.state4.switchValue4}
            />
          </View>

          <View style={styles.item2}>
            <Text style={styles.item_text}> settings 5 </Text>
            <TextInput
              style={{fontSize: 20, height: 40, flex: 2, alignItems: 'flex-start', borderColor: 'gray',}}
              placeholder="Input stuff"
              onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View style={styles.item2}>
            <Button style = {{ marginLeft: 30, marginRight:30, fontSize: 20, flex: 1, alignItems: 'flex-start'}}
              
              title="Save"
              color="#28B490"
              accessibilityLabel="click to save"
            />
            <Button style = {{ marginLeft: 30, marginRight:30, fontSize: 20, flex: 1, alignItems: 'flex-end'}}
              
              title="Default"
              color="#28B490"
              accessibilityLabel="click to return to default settings"
            />
          </View> 
        </View>



        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    textAlign: 'left',
  },

  container2: {
    flex: 1,
    flexDirection: 'column',    
  },
  box: {
    height: 10 //set this one
  },
  box1: {
    flex:1,
  },
  box2: {
    flex: 10,
    backgroundColor: '#f0ead6',
  },
  item:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  item2:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  item3:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  item_text:{
    flex: 2,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 20,
  },
  item_switch:{
    flex: 2,
    alignItems: 'flex-start',
  },

});