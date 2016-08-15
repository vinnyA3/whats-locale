import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class LocationInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.term.trim();
    if(!searchTerm) {
      return;
    }
    this.props.handleSearch(searchTerm);
  }

  onInputChange(term){
    this.setState({ term })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <input type="text" value={this.state.term} onChange={ (event) => this.onInputChange(event.target.value)} />
        <input type="submit" value="Search" />
      </form>
    )
  }
}
