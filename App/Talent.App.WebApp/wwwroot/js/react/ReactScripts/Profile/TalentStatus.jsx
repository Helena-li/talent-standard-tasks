import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const details = props.status ? props.status : { "status": "", "availableDate": null }

        this.state = {
            jobStatus: details.status,
            availableDate: details.availableDate
        }

        this.handleChange = this.handleChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.saveStatus = this.saveStatus.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status != this.props.status) {
            this.setState({
                jobStatus: this.props.status.status,
                availableDate: this.props.status.availableDate
            })
        }
    }

    handleChange(val) {
        //console.log("value", val)
        //console.log("jobStatus", this.props.status)

        //this.setState({
        //    //jobStatus: val,
        //    temp: val
        //},
        //    this.saveStatus
        //)
        if (val == 'later') {
            this.setState({
                jobStatus: val
            })
        } else {
            this.setState({
                jobStatus: val,
                availableDate: null
            },
                this.saveStatus
            )
        }
    }


    onChange() {
        var data = event.target.value
        //console.log("onChange", data)
        this.setState({
            availableDate: data
        })
    }

    saveStatus() {
        const data = this.state.jobStatus
        const temp = this.state.availableDate

        //console.log("saveStatus", data)
        const x = { "status": data, "availableDate": temp }
        this.props.saveProfileData({ "jobSeekingStatus": x })
    }

    render() {
        //console.log("props", this.props.status)
        //console.log("JobStatusRender", this.state.jobStatus)
        return (
            <React.Fragment>
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <div>
                            <div className="field">
                                <b>Current Status</b>
                            </div>
                            <div className="field">
                                <Checkbox
                                    radio
                                    label='Actively looking for a job'
                                    name='checkboxRadioGroup'
                                    value='active'
                                    checked={this.state.jobStatus === 'active'}
                                    onChange={this.handleChange.bind(this, 'active')}
                                />
                            </div>
                            <div className="field">
                                <Checkbox
                                    radio
                                    label='Not looking for a job at the moment'
                                    name='checkboxRadioGroup'
                                    value='inactive'
                                    checked={this.state.jobStatus === 'inactive'}
                                    onChange={this.handleChange.bind(this, 'inactive')}
                                />
                            </div>
                            <div className="field">
                                <Checkbox
                                    radio
                                    label='Currently employed but open to offers'
                                    name='checkboxRadioGroup'
                                    value='employed'
                                    checked={this.state.jobStatus === 'employed'}
                                    onChange={this.handleChange.bind(this, 'employed')}
                                />
                            </div>
                            <div className="field">
                                <Checkbox
                                    radio
                                    label='Will be available on later date'
                                    name='checkboxRadioGroup'
                                    value='later'
                                    checked={this.state.jobStatus === 'later'}
                                    onChange={this.handleChange.bind(this, 'later')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.jobStatus === 'later'
                    ? <div className="row">
                        <div className="ui three wide column">
                            <div className="field">
                                <label>Available Date: </label>
                            </div>
                        </div>
                        <div className="ui six wide column">
                            <input type="date" name="availDate" placeholder="Available Date" value={this.state.availableDate} onChange={this.onChange} />
                        </div>
                        <div className="ui four wide column">
                            <button type="button" className="ui teal button" onClick={this.saveStatus}>Save Date</button>
                        </div>
                    </div>
                    : <React.Fragment>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}