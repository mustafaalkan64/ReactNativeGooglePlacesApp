import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from "react-native-maps";

import {request, PERMISSIONS} from 'react-native-permissions';


export default class CurrentPosition extends Component {
	state = {
		region: {
			latitude: 35.0087,
			longitude: 35.0173,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
	};

	async componentDidMount() {
		// alert(permission);
		// const permission = await Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
		
		// if (permission !== 'authorized') {
		//   alert('lütfen konum izinlerini verin.');
		//   return false;
		// }

		request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
			// …
			if (result !== 'granted') {
			  alert('lütfen konum izinlerini verin.');
			  return false;
			}
		  });

		const {coords} = await this.getCurrentPosition();
		this.setState({
			region: {
				...this.state.region,
				latitude: coords.latitude,
				longitude: coords.longitude
			},
		});
	}

	getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				position => {
					resolve(position)
				}),
				reject,
				{
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: 1000
				}
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					loadingEnabled={true}
					showsUserLocation={true}
					style={styles.map}
					region={this.state.region}
				>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	map: {
		flex: 1
	},
});     