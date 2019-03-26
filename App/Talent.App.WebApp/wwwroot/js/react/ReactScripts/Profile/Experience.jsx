/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Grid } from 'semantic-ui-react';
export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const experience = props.experienceData
        this.state = {
            showAddNew: false,
            showUpdate: false,
            updateId: "",
            newExperience: experience,
            company: "",
            position: "",
            responsibilities: "",
            start: new Date,
            end: new Date,
        }
        this.showAddNew = this.showAddNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)
        this.showUpdate = this.showUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
        this.onChange = this.onChange.bind(this)
        this.inputDateForm = this.inputDateForm.bind(this)
        this.TableDateForm = this.TableDateForm.bind(this)
        this.nth = this.nth.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
    };
    showAddNew() {
        const details = this.props.experienceData
        this.setState({
            showAddNew: true,
            newExperience: details,
            company: "",
            position: "",
            responsibilities: "",
            start: new Date,
            end: new Date,
        })
    }
    closeAddNew() {
        this.setState({
            showAddNew: false,
        })
    }
    showUpdate(id, comp, pos, resp, start, end) {
        const details = this.props.experienceData
        this.setState({
            showUpdate: true,
            newExperience: details,
            updateId: id,
            company: comp,
            position: pos,
            responsibilities: resp,
            start: start,
            end: end
        })
    }
    closeUpdate() {
        this.setState({
            showUpdate: false,
        })
    }
    onChange() {
        var data = event.target.value;
        var name = event.target.name;
        switch (name) {
            case "company":
                this.setState({ company: data });
                break;
            case "position":
                this.setState({ position: data });
                break;
            case "start":
                this.setState({ start: data });
                break;
            case "end":
                this.setState({ end: data });
                break;
            case "responsibilities":
                this.setState({ responsibilities: data });
                break;
        }
    }
    deleteExperience(id) {
        let temp = this.props.experienceData
        //console.log("temp", temp)
        const index = temp.findIndex(obj => obj.id == id)
        temp.splice(index, 1)
        //console.log("delete", temp)
        this.props.updateProfileData(temp)
        //this.closeUpdate()
    }
    updateExperience() {
        let arr = this.state.newExperience
        //console.log("arr", arr)
        const index = arr.findIndex(obj => obj.id == this.state.updateId)
        arr[index].company = this.state.company
        arr[index].position = this.state.position
        arr[index].responsibilities = this.state.responsibilities
        arr[index].start = this.state.start
        arr[index].end = this.state.end
        //console.log("update", arr)
        this.props.updateProfileData(arr)
        this.closeUpdate()
    }
    saveExperience() {
        let company = this.state.company
        let position = this.state.position
        let start = this.state.start
        let end = this.state.end
        let responsibilities = this.state.responsibilities
        this.state.newExperience.push({ company, position, start, end, responsibilities })
        var data = Object.assign([], this.state.newExperience)
        //console.log("save", data)
        this.props.updateProfileData({ "experience": data })
        this.closeAddNew()
    }
    inputDateForm(inputDate) {
        var temp = new Date(inputDate);
        var day = temp.getDate();
        var month = temp.getMonth() + 1;
        var year = temp.getFullYear();
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        if (year < 10) {
            year = "000" + year
        } else if (year < 100) {
            year = "00" + year
        } else if (year < 1000) {
            year = "0" + year
        }
        var date = (year + "-" + month + "-" + day);
        return date;
    }
    TableDateForm(tempdate) {
        var temp = new Date(tempdate);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var date = (temp.getDate() + this.nth(temp.getDate()) + " " + monthNames[temp.getMonth()] + ", " + temp.getFullYear());
        return date;
    }
    nth(d) {
        if (d > 3 && d < 21) {
            return 'th';
        }
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    render() {
        //console.log("company", this.state.company)
        //console.log("position", this.state.position)
        //console.log("start", this.state.start)
        //console.log("end", this.state.end)
        //console.log("respons", this.state.responsibilities)
        const xtr = this.props.experienceData
        //console.log("experienceData", this.props.experienceData)
        //console.log("newExperience", xtr)
        let options = null
        if (this.state.showAddNew) {
            options = <React.Fragment>
                <div className="row">
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>Company</label>
                            <input type="text" name="company" placeholder="Add Company" value={this.state.company} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>Position</label>
                            <input type="text" name="position" placeholder="Add Position" value={this.state.position} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>Start Date</label>
                            <input type="date" name="start" placeholder="Add Start Date" value={this.state.start} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="ui eight wide column">
                        <div className="field">
                            <label>End Date</label>
                            <input type="date" name="end" placeholder="Add End Date" value={this.state.end} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <div className="field">
                            <label>Responibilities</label>
                            <input type="text" name="responsibilities" placeholder="Add Responsibilities" value={this.state.responsibilities} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui four wide column">
                        <button type="button" className="ui teal button" onClick={this.saveExperience}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        }
        let list = this.props.experienceData;
        //console.log("list", list)
        let tableData = null;
        if (list != "") {
            tableData = list.map(entry =>
                <Table.Row key={entry.id}>
                    {this.state.showUpdate && entry.id == this.state.updateId
                        ? <React.Fragment>
                            <Table.Cell colSpan={6}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Company</label>
                                                <input type="text" name="company" placeholder="Add Company" value={this.state.company} onChange={this.onChange} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Position</label>
                                                <input type="text" name="position" placeholder="Add Position" value={this.state.position} onChange={this.onChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>Start Date</label>
                                                <input type="date" name="start" placeholder="Add Start Date" value={this.inputDateForm(this.state.start)} onChange={this.onChange} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width="eight">
                                            <div className="field">
                                                <label>End Date</label>
                                                <input type="date" name="end" placeholder="Add End Date" value={this.inputDateForm(this.state.end)} onChange={this.onChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className="field">
                                                <label>Responibilities</label>
                                                <input type="text" name="responsibilities" placeholder="Add Responsibilities" value={this.state.responsibilities} onChange={this.onChange} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className="field">
                                                <button type="button" className="ui teal button" onClick={this.updateExperience}>Update</button>
                                                <button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button>
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Table.Cell>
                        </React.Fragment>
                        : <React.Fragment>
                            <Table.Cell>{entry.company}</Table.Cell>
                            <Table.Cell>{entry.position}</Table.Cell>
                            <Table.Cell>{entry.responsibilities}</Table.Cell>
                            <Table.Cell>{this.TableDateForm(entry.start)}</Table.Cell>
                            <Table.Cell>{this.TableDateForm(entry.end)}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Icon name="pencil" onClick={this.showUpdate.bind(this, entry.id, entry.company, entry.position, entry.responsibilities, entry.start, entry.end)} />
                                <Icon name="cancel" onClick={this.deleteExperience.bind(this, entry.id)} />
                            </Table.Cell>
                        </React.Fragment>
                    }

                </Table.Row>
            )
        }
        return (
            <React.Fragment>
                {options}
                <div className="ui sixteen wide column">
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.showAddNew}>+ Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData}
                        </Table.Body>
                    </Table>
                </div>
            </React.Fragment>
        )

    }
}