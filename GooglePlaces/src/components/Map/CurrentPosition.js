import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from "react-native-maps";

import {request, PERMISSIONS} from 'react-native-permissions';
import {API_KEY, API_ENDPOINT} from '../../consts';
import axios from 'axios';
import Places from '../Places/Index';


export default class CurrentPosition extends Component {
	state = {
		region: {
			latitude: 35.0087,
			longitude: 35.0173,
			latitudeDelta: 0.0622,
			longitudeDelta: 0.0421,
		},
		places: [],
		fetching: false
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

		const {coords: {latitude, longitude}} = await this.getCurrentPosition();
		this.setState({
			region: {
				...this.state.region,
				latitude,
				longitude
			},
			fetching: true
		});

		const {data: {results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`)
			this.setState({
				places: results,
				fetching: false
			});
		console.log(this.state.places);
	}

	getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				position => resolve(position)
				),
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
					ref={ref => this.map = ref}
				>
					{
						this.state.places.map(place => {
							console.log(place);
							const { geometry : { location : {lat, lng}}} = place;
							return (
								<Marker
									key={place.id}
									coordinate={{
										latitude: lat,
										longitude: lng
									}}
									title={place.name}
								/>
							)
						})
					}
				</MapView>
				<View style={styles.placesContainer}>
					{
						this.state.fetching ? <Text style={styles.loading}>Loading nearby places...</Text> :
							<Places map={this.map} places={this.state.places}/>
					}
				</View>
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
	placesContainer: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100%',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loading: {
		padding: 10,
		backgroundColor: '#f1f1f1',
		fontSize: 13,
		color: '#333'
	}
});