import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, Text} from 'react-native';

 //import Region from './src/components/Region';
import Markers from './src/components/Markers';
import CurrentPosition from './src/components/CurrentPosition';

export default class App extends Component {


	render() {
    return (
      <CurrentPosition />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });