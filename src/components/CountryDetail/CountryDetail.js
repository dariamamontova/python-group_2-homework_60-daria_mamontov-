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
                <h1>{this.state.loadedCountry.name}</h1>
                <p>Capital: {this.state.loadedCountry.capital}</p>
                <p>Region: {this.state.loadedCountry.region}</p>
            </div> : null
        );
    }
}

export default CountryDetail;