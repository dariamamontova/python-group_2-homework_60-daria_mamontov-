import React, {Component} from 'react';
import axios from 'axios';


class CountryDetail extends Component {
    state = {
        loadedCountry: null
    };

    componentDidUpdate() {
        const loadedCountry = this.state.loadedCountry;
        const newCountryCode = this.props.code;

        if (newCountryCode) {
            if (!loadedCountry || newCountryCode !== loadedCountry.alpha3Code) {
                axios.get('alpha/' + this.props.code).then(response => {
                    this.setState({loadedCountry: response.data});
                });
            }
        }
    }

    render() {
        return (
            this.state.loadedCountry ? <div className="FullPost">
                <h1 className="mb-5">{this.state.loadedCountry.name}</h1>
                <p><span className="font-weight-bold">Capital:</span> {this.state.loadedCountry.capital}</p>
                <p><span className="font-weight-bold">Region:</span> {this.state.loadedCountry.region}</p>
                <p><span className="font-weight-bold">Population:</span> {this.state.loadedCountry.population}</p>
            </div> : <p>Choose a country</p>
        );
    }
}

export default CountryDetail;