import { Component } from "react";
import ReactDOM from "react-dom";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      center: {lng: -34.397, lat: 150.644},
      term: "restaurants"
    }
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  geoLocate() {

    const OPTIONS = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    let geoSuccess = (pos) => {
      this.setState({center: {lng: pos.coords.longitude, lat: pos.coords.latitude}});
    };

    let geoError = (err) => {
      console.log("Error: " + err);
    }

    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, OPTIONS);
    }else{
      console.log("Geolocation not available");
      // set state center to default
    }
  }

  handleSearchTerm(term) {
    this.setState({ term });
  }

  componentDidMount() {
    this.geoLocate();
  }

  render(){
    return(
      <div>
        <LocationInput handleSearch={this.handleSearchTerm} />
        <GoogleMap searchTerm={this.state.term} center={this.state.center} />
      </div>
    )
  }
}
