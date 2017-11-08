//import the dependencies
import React, {Component} from 'react';
import { View, Text, AppRegistry} from 'react-native';

  
import RootComponent from './src/app.js';


AppRegistry.registerComponent('helloWorld', function() {
	return RootComponent;
})
