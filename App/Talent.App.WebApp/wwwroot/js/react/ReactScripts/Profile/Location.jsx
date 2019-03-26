import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const details = props.addressData

        this.state = {
            showEditSection: false,
            newDetails: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = this.props.addressData
        this.setState({
            showEditSection: true,
            newDetails: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = this.state.newDetails
        data[event.target.name] = event.target.value
        this.setState({
            newDetails: data
        })
    }

    saveDetails() {
        //console.log(this.state.newDetails)
        const data = this.state.newDetails
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.props.addressData.country;
        const selectedCity = this.props.addressData.city;
        

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var city = Array.from(new Set(Countries[selectedCountry]));
            var popCities = city.map(x => <option key={x} value={x}> {x}</option>);
            
        }

        //console.log("newAddress", this.state.newDetails)

        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui four wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newDetails.number}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder="Enter your street number"
                            errorMessage="Please enter a valid street number"
                        />
                    </div>

                    <div className="ui eight wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newDetails.street}
                            controlFunc={this.handleChange}
                            maxLength={40}
                            placeholder="Enter your street name"
                            errorMessage="Please enter a valid street name"
                        />
                    </div>

                    <div className="ui four wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newDetails.suburb}
                            controlFunc={this.handleChange}
                            maxLength={30}
                            placeholder="Enter your suburb"
                            errorMessage="Please enter a valid suburb"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="ui six wide column">
                        <div className="field">
                            <label>Country</label>
                            <select
                                className="ui dropdown"
                                placeholder="Country"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">
                                <option value="0"> Select a country</option>
                                {countriesOptions}
                            </select>
                        </div>
                    </div>

                    <div className="ui six wide column">
                        <div className="field">
                            <label>City</label>
                            <select
                                className="ui dropdown"
                                placeholder="City"
                                value={selectedCity}
                                onChange={this.handleChange}
                                name="city">
                                <option value="0"> Select a town or city</option>
                                {popCities}
                            </select>
                        </div>
                    </div>

                    <div className="ui four wide column">
                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="postCode"
                            value={this.state.newDetails.postCode}
                            controlFunc={this.handleChange}
                            maxLength={30}
                            placeholder="Enter your post code"
                            errorMessage="Please enter a valid post code"
                        />
                    </div>
                </div>

                <div className="row">
                    <button type="button" className="ui black button" onClick={this.saveDetails}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay() {
        //console.log("Address", this.props.addressData)
        let address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <React.Fragment>
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <React.Fragment>
                            <p>Address: {address}</p>
                            <p>City: {city}</p>
                            <p>Country: {country}</p>
                        </React.Fragment>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const details = props.nationalityData

        this.state = {
            newNationality: details
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
    }

    handleChange(event) {        
        const data = Object.assign({}, this.state.newNationality)
        //console.log("nation", data)
        data[event.target.name] = event.target.value
        
        this.setState({
            newNationality: data
        },
            this.saveDetails
        )
    }

    saveDetails() {
        //console.log("save nation", this.state.newNationality)
        const data = this.state.newNationality
        this.props.saveProfileData(data)        
    }

    render() {
        let nationOptions = [];
        const selectedNation = this.props.nationalityData;

        nationOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        //console.log("list", nationOptions)

        return (
            <React.Fragment>
                <div className="ui six wide column">
                    <div className="field">                        
                        <select
                            className="ui dropdown"
                            placeholder="Select your nationality"
                            value={selectedNation}
                            onChange={this.handleChange}
                            name="nationality">
                            <option value="0"> Select your nationality</option>
                            {nationOptions}
                        </select>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}