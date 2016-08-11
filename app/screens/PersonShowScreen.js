'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native'
import message from '../componets/Temp'
import ViewContainer from '../componets/ViewContainer'
import StatusBarBackground from '../componets/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'


const people =[
  {firstName: "me", lastName: "hi", roomNumber: 1},
  {firstName: "you", lastName: "No", roomNumber: 30},
  {firstName: "he", lastName: "man", roomNumber: 300},
  {firstName: "going", lastName: "home", roomNumber: 14}
]

class PersonShowScreen extends Component {
  constructor(props) {
    super(props)

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state ={
      peopleDataSource: ds.cloneWithRows(people)
    }

  }

  render() {
    return (
      <ViewContainer style={{backgroundColor: "green"}}>
      <StatusBarBackground />
      <TouchableOpacity onPress={() => this.props.navigator.pop() }>
        <Icon name="times" size={25} />
      </TouchableOpacity>
      <ListView
        style={{marginTop: 100}}
        dataSource={this.state.peopleDataSource}
        renderRow={(person) => { return this._renderPersonRow(person) }} />

      <Text style={{marginTop: 100, fontSize: 24}}>{`Person Show Page`}</Text>
      <Text style={styles.personName}>
        {`${_.capitalize(this.props.person.firstName)} ${_.capitalize(this.props.person.lastName)}`}
      </Text>
      </ViewContainer>
    )
  }

  _renderPersonRow(person) {
    return (
      <TouchableOpacity style={styles.personRow} onPress={(event) => this._navigateToPersonShow(person) } >
        <Text style={styles.personName}>
          {`${_.capitalize(person.firstName)} ${_.capitalize(person.lastName)}`}
        </Text>
        <View style={{flex: 1}} />
        <Icon name="chevron-right" style={styles.personMoreIcon} />
      </TouchableOpacity>
    )
  }

  _navigateToPersonShow(person) {
    this.props.navigator.push({
      ident: "PersonShow",
      person: person,
    //  sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  personRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 30,
  },
  personName: {
    marginLeft: 25,
    color: 'skyblue'
  },
  personMoreIcon: {
    color: "green",
    height: 20,
    width: 20,
    marginRight: 25,
  }

});

module.exports = PersonShowScreen
