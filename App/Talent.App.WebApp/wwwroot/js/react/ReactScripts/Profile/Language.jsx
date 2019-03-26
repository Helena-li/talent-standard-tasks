/* Language section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Icon } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const details = props.languageData

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
        this.saveDetails = this.saveDetails.bind(this)

        this.onDropdownSelected = this.onDropdownSelected.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)

        this.showUpdate = this.showUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)

        this.saveUpdate = this.saveUpdate.bind(this)
    }

    openAddNew() {
        const details = this.props.languageData
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
        //console.log("language name : ", data);

        this.setState({
            name: data
        })
    }

    onDropdownSelected(event) {
        const data = event.target.value
        //console.log("language level : ", data);

        this.setState({
            level: data
        })
    }

    deleteLanguage(id) {
        let arr = this.props.languageData
        const index = arr.findIndex(obj => obj.id == id)
        arr.splice(index, 1)

        //console.log("newdelete", arr)
        this.props.updateProfileData(arr)
    }

    showUpdate(id, langUpdate, levelUpdate) {
        const data = this.props.languageData

        this.setState({
            showUpdateSection: true,
            newDetails: data,
            updateId: id,
            name: langUpdate,
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

        //newData[6].id = "5c86e6ba9e4e0f2fec308828"

        //console.log("update", newData)
        this.props.updateProfileData(newData)
        this.closeUpdate()
    }

    render() {
        let list = this.props.languageData;
        //console.log("render", this.props.languageData)
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
                        placeholder="Add Language"
                        errorMessage="Please enter a valid language"
                    />
                </div>

                <div className="ui five wide column">
                    <div className="field">
                        <select
                            className="ui dropdown"
                            name="level"
                            placeholder="Language Level"
                            onChange={this.onDropdownSelected}>

                            <option value="0">Language Level</option>
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
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
            dataList = list.map(languageData =>
                <Table.Row key={languageData.id}>
                    {this.state.showUpdateSection && languageData.id == this.state.updateId
                        ? <React.Fragment>
                            <Table.Cell>
                                <input value={this.state.name} onChange={this.handleChange} placeholder="Update Language"></input>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="field">
                                    <select className="ui dropdown" value={this.state.level} name="level" placeholder="Language Level" onChange={this.onDropdownSelected}>
                                        <option value="0">Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native/Bilingual">Native/Bilingual</option>
                                    </select>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <button type="button" className="ui basic red button" onClick={this.saveUpdate}>Update</button>
                                <button type="button" className="ui basic blue button" onClick={this.closeUpdate}>Cancel</button>
                            </Table.Cell>
                        </React.Fragment>
                        : <React.Fragment>
                            <Table.Cell>{languageData.name}</Table.Cell>
                            <Table.Cell>{languageData.level}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Icon name="pencil" onClick={this.showUpdate.bind(this, languageData.id, languageData.name, languageData.level)} />
                                <Icon name="cancel" onClick={this.deleteLanguage.bind(this, languageData.id)} />
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
                                <Table.HeaderCell className="ui six wide">Language</Table.HeaderCell>
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