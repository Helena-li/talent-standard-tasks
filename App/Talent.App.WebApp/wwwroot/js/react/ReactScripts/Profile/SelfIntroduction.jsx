/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        const summary = props.summary ? props.summary : ""
        const description = props.description ? props.description : ""

        this.state = {
            newSummary: summary,
            newDescription: description,
            formErrors: { summary: '', description: '' },
            summaryValid: false,
            descriptionValid: false,
            formValid: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.validateField = this.validateField.bind(this)
        this.errorClass = this.errorClass.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
    };
    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                newSummary: this.props.summary,
                newDescription: this.props.description,
            })
            if (this.props.summary != "") {
                this.setState({
                    summaryValid: true
                })
            }
            if (this.props.description != "") {
                this.setState({
                    descriptionValid: true
                })
            }
            if (this.props.summary != "" && this.props.description != "") {
                this.setState({
                    formValid: true
                })
            }
        }
    }
    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        if (name == "summary") {
            //console.log("name", name)
            //console.log("value", value)

            this.setState({
                newSummary: value
            }, () => { this.validateField(name, value) })
        }
        else {
            //console.log("name", name)
            //console.log("value", value)

            this.setState({
                newDescription: value
            }, () => { this.validateField(name, value) })
        }
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let summaryValid = this.state.summaryValid;
        let descriptionValid = this.state.summaryValid;
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'summary':
                summaryValid = value.length != 0;
                fieldValidationErrors.summary = summaryValid ? '' : ' must not be empty';
                break;
            case 'description':
                descriptionValid = value.length >= 150;
                fieldValidationErrors.description = descriptionValid ? '' : ' must be between 150 and 600 characters';
                break;
            default:
                break;
        }
        //console.log("validate", summaryValid, descriptionValid)
        if (summaryValid && descriptionValid) {
            formValid = true
        }
        else {
            formValid = false
        }
        this.setState({
            formErrors: fieldValidationErrors,
            summaryValid: summaryValid,
            descriptionValid: descriptionValid,
            formValid: formValid
        });
    };
    errorClass(error) {
        return (error.length === 0 ? false : true);
    };
    saveDetails() {
        //console.log(this.state.newSummary)
        //console.log(this.state.newDescription)
        const data = {
            summary: this.state.newSummary,
            description: this.state.newDescription
        }
        this.props.updateProfileData(data)
        //this.props.updateProfileData(this.state.newDescription)
    }
    render() {
        //console.log("summary", this.state.newSummary)
        //console.log("description", this.state.newDescription)
        //console.log("formValid", this.state.formValid)
        return (
            <React.Fragment>
                <div className='ui row tooltip-target'>
                    <div className="ui four wide column">
                        <h3>Description</h3>
                        <div className="tooltip">Write a description about yourself.</div>
                    </div>
                    <div className="twelve wide column">
                        <div className="field">
                            <input maxLength="150" name="summary" placeholder="Please provide a short summary about yourself" value={this.state.newSummary} onChange={this.handleChange} />
                            {this.errorClass(this.state.formErrors.summary) ? <div className="ui basic red pointing prompt label transition visible">"Please provide a short summary"</div> : null}
                        </div>
                        <p>Summary must be no more than 150 characters.</p>
                        <div className="field" >
                            <textarea maxLength="600" minLength="150" name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.state.newDescription} onChange={this.handleChange} ></textarea>
                            {this.errorClass(this.state.formErrors.description) ? <div className="ui basic red pointing prompt label transition visible">"Must be between 150 and 600 characters"</div> : null}
                        </div>
                        <p>Description must be between 150-600 characters.</p>
                        <button type="button" className={`ui right floated teal button ${this.state.formValid ? '' : 'disabled'}`} onClick={this.saveDetails}>Save</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}