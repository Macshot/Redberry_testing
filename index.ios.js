/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import { AppRegistry, Navigator, StyleSheet, Text, View, ListView, TouchableOpacity, TabBarIOS } from 'react-native'
 import message from './app/componets/Temp'
 import ViewContainer from './app/componets/ViewContainer'
 import StatusBarBackground from './app/componets/StatusBarBackground'
 import _ from 'lodash'
 import Icon from 'react-native-vector-icons/Ionicons'
 import PeopleIndexScreen from './app/screens/PeopleIndexScreen'
 import PersonShowScreen from './app/screens/PersonShowScreen'
 import AppNavigator from './app/navigation/AppNavigator'

 const data = [{key:'yes'},{key2:'no'}]

 console.disableYellowBox = true;
 /* <AppNavigator
    initialRoute={{ident: "PeopleIndex"}}/> */

 class TestBerry extends Component {
   constructor(props){
     super(props)
     this.state = {
       selectedTab: "tab1"
     }
   }

   render() {
     return(
       <TabBarIOS
         selectedTab={this.state.selectedTab}>
         <Icon.TabBarItemIOS
           selected={this.state.selectedTab === "tab1"}
           iconName="ios-home-outline"
           title = "Home"
           onPress={() => this.setState({selectedTab: "tab1"})}>
           <AppNavigator
             initialRoute={{ident: "PeopleIndex"}}/>
         </Icon.TabBarItemIOS>
         <Icon.TabBarItemIOS
         selected={this.state.selectedTab === "tab2"}
         iconName="ios-basket-outline"
         title = "Mall"
         onPress={() => this.setState({selectedTab: "tab2"})}>
         <AppNavigator
           initialRoute={{ident: "Store",
                         store:47}}/>
         </Icon.TabBarItemIOS>
       </TabBarIOS> 
     )
   }
   
   /*<TabBarIOS
         selectedTab={this.state.selectedTab}>
         <Icon.TabBarItemIOS
           selected={this.state.selectedTab === "tab1"}
           title={'TAB 1'}
           iconName="user"
           onPress={() => this.setState({selectedTab: "tab1"})}>
           <AppNavigator
             initialRoute={{ident: "PeopleIndex"}}/>
         </Icon.TabBarItemIOS>
         <TabBarIOS.Item
         selected={this.state.selectedTab === "tab2"}
         title={'TAB 2'}
         onPress={() => this.setState({selectedTab: "tab2"})}>
         <AppNavigator
           initialRoute={{ident: "PersonShow",
                         person: {firstName: "he", lastName: "man", roomNumber: 300}}}/>
         </TabBarIOS.Item>
       </TabBarIOS>  */


 }


 const styles = StyleSheet.create({

   navigatorStyles: {

   }

 });


AppRegistry.registerComponent('TestBerry', () => TestBerry);
