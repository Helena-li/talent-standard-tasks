/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Icon } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        const details = props.skillData

        this.state = {
            showEditSection: false,
            newDetails: details,
            name: "",
            level: "",
            updateId: "",
            showUpdateSection: false
        }

        this.openAddNew = this.openAddNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.onDropdownSelected = this.onDropdownSelected.bind(this)

        this.saveDetails = this.saveDetails.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.saveUpdate = this.saveUpdate.bind(this)

        this.showUpdate = this.showUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
    };


    openAddNew() {
        const details = this.props.skillData
        this.setState({
            showEditSection: true,
            newDetails: details,
            name: "",
            level: ""
        })
    }

    closeAddNew() {
        this.setState({
            showEditSection: false
        })
    }

    closeUpdate() {
        this.setState({
            showUpdateSection: false
        })
    }

    handleChange(event) {
        const data = event.target.value
        //console.log("skill name : ", data);

        this.setState({
            name: data
        })
    }

    onDropdownSelected(event) {
        const data = event.target.value
        //console.log("skill level : ", data);

        this.setState({
            level: data
        })
    }

    deleteSkill(id) {
        let arr = this.props.skillData
        const index = arr.findIndex(obj => obj.id == id)
        arr.splice(index, 1)

        //console.log("newdelete", arr)
        this.props.updateProfileData(arr)
    }

    showUpdate(id, nameUpdate, levelUpdate) {
        const data = this.props.skillData

        this.setState({
            showUpdateSection: true,
            newDetails: data,
            updateId: id,
            name: nameUpdate,
            level: levelUpdate
        })
    }

    saveDetails() {
        let name = this.state.name
        let level = this.state.level

        this.state.newDetails.push({ name, level })
        var data = Object.assign({}, this.state.newDetails)

        //console.log("save", data)

        this.props.updateProfileData(data)
        this.closeAddNew()
    }

    saveUpdate() {
        let newData = this.state.newDetails
        const data = newData.findIndex(obj => obj.id == this.state.updateId)
        newData[data].name = this.state.name
        newData[data].level = this.state.level
        
        //console.log("update", newData)
        this.props.updateProfileData(newData)
        this.closeUpdate()
    }

    render() {
        let list = this.props.skillData;
        //console.log("render", this.props.skillData)
        let dataList = null;

        let options = null;
        if (this.state.showEditSection) {
            options = <div className="row">

                <div className="ui five wide column">
                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        value={this.state.name}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder="Add Skill"
                        errorMessage="Please enter a valid skill"
                    />
                </div>

                <div className="ui five wide column">
                    <div className="field">
                        <select
                            className="ui dropdown"
                            name="level"
                            placeholder="Skill Level"
                            onChange={this.onDropdownSelected}>

                            <option value="0">Skill Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>

                <div className="ui six wide column">
                    <button type="button" className="ui black button" onClick={this.saveDetails}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                </div>
            </div>
        }
        //console.log("id", this.state.updateId)
        if (list != "") {
            dataList = list.map(skillData =>
                <Table.Row key={skillData.id}>
                    {this.state.showUpdateSection && skillData.id == this.state.updateId
                        ? <React.Fragment>
                            <Table.Cell>
                                <input value={this.state.name} onChange={this.handleChange} placeholder="Update Skill"></input>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="field">
                                    <select className="ui dropdown" value={this.state.level} name="level" placeholder="Skill Level" onChange={this.onDropdownSelected}>
                                        <option value="0">Skill Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <button type="button" className="ui basic red button" onClick={this.saveUpdate}>Update</button>
                                <button type="button" className="ui basic blue button" onClick={this.closeUpdate}>Cancel</button>
                            </Table.Cell>
                        </React.Fragment>
                        : <React.Fragment>
                            <Table.Cell>{skillData.name}</Table.Cell>
                            <Table.Cell>{skillData.level}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Icon name="pencil" onClick={this.showUpdate.bind(this, skillData.id, skillData.name, skillData.level)} />
                                <Icon name="cancel" onClick={this.deleteSkill.bind(this, skillData.id)} />
                            </Table.Cell>
                        </React.Fragment>
                    }
                </Table.Row>
            );
        }
        return (
            < React.Fragment >
                {options}
                <div className='ui sixteen wide column'>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className="ui six wide">Skill</Table.HeaderCell>
                                <Table.HeaderCell className="ui six wide">Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" color='black' className="ui right floated teal button" onClick={this.openAddNew} >
                                    <Icon name="plus" />Add New</button>
                                </Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {dataList}
                        </Table.Body>
                    </Table>
                </div>
            </React.Fragment >
        )
    }
}

