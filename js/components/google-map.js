import { Component } from "react";
import ReactDOM from "react-dom";
export default class GoogleMap extends Component {

  createMap() {
    let options = {
      zoom: 15,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.map, options);
  }

  createPlaces() {
    return new google.maps.places.PlacesService(this.map);
  }

    renderPlaces() {
      let request = {
        location: this.mapCenter(),
        radius: '800',
        query: this.props.searchTerm
      };
      this.places.textSearch(request, (results, status) => {
        var infowindow = new google.maps.InfoWindow();
        results.forEach((place) => {
          // console.log(place);
          let map_place = place;
          let marker = new google.maps.Marker({
            map: this.map,
            position: map_place.geometry.location
          });

          this.places.getDetails({placeId: place.place_id},(place_loc, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              return;
            }
            let contentString = "<h1 class='infowindow__title'>"+place_loc.name+"</h1>"+
              "<h1 class='infowindow__address'>Address: "+place_loc.formatted_address+"</h1>"+
              "<h1 class='infowindow__address'>Phone: "+place_loc.formatted_phone_number+"</h1>";
            // Add click event to the rendered marker
            google.maps.event.addListener(marker, 'click', () => {
             infowindow.setContent(contentString);
             infowindow.open(this.map, marker);
            });
          });
        });
      });
    }

  mapCenter() {
    return this.props.center;
  }

  componentDidMount() {
    console.log(this.props.center);
    this.map = this.createMap();
    this.places = this.createPlaces();
    this.renderPlaces();
  }

  /* componentWillReceiveProps(nextProps) {
    this.props.center = nextProps.center;
    this.map = this.createMap();
    this.places = this.createPlaces();
    this.renderPlaces();
  } */

  render(){
    return(
      <div ref="map" className="google-map">Map Here</div>
    )
  }
}
