'use strict'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#e9e9e9",
    marginBottom: 45,
  }
})

module.exports = ViewContainer
