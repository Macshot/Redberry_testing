'use strict'

import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native'
import message from '../componets/Temp'
import ViewContainer from '../componets/ViewContainer'
import StatusBarBackground from '../componets/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import PeopleIndexScreen from '../screens/PeopleIndexScreen'
import PersonShowScreen from '../screens/PersonShowScreen'
import StoreScreen from '../screens/StoreScreen'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }
      switch(route.ident) {
        case "PeopleIndex":
          return (
            <PeopleIndexScreen
              {...globalNavigatorProps} />
          )
        case "PersonShow":
          return (
            <PersonShowScreen
              {...globalNavigatorProps}
              person={route.person}/>
          )
        case "Store":
          return (
            <StoreScreen
              {...globalNavigatorProps}
              store={route.store}
              stores={route.stores}/>
          )  
        case "Temp":
          return (
            <Text> 'Hello World'</Text>
          )
    }
  }

  render() {
    return(
      <Navigator
        initialRoute={this.props.initialRoute} /* initialRoute={{ident: this.props.initialRoute}} */
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight,
          gestures: route.gestures
        })
        }/>
    /*  <PeopleIndexScreen />*/
    )
  }
}


const styles = StyleSheet.create({

  navigatorStyles: {

  }

});

module.exports = AppNavigator
