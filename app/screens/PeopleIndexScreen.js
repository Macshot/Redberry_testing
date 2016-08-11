import NavigationBar from 'react-native-navbar'
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  Image,
  ActivityIndicatorIOS,
  TouchableHighlight,
  Dimensions,
} from 'react-native'
import message from '../componets/Temp'
import ViewContainer from '../componets/ViewContainer'
import StatusBarBackground from '../componets/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

var {
  width,
  height
} = Dimensions.get('window')

console.log(width)

class PeopleIndexScreen extends Component {
  constructor(props) {
    super(props)
    this.state ={
      isLoading: true,
      productData: '',
      storeData: '',
      rowID: null,
      variationHeight: 0,
      imageHeight: 450,
      imageView: true,
      variationView: false,
      listSize: 5,
      dropdownSelection: { title: '-- Choose --'},
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    }
  }
  
  render() {
     if (this.state.isLoading ) {
           return this.renderLoadingView();
       }
    
     return (
      <ViewContainer>
        <NavigationBar
          title={{ title: "RedBerry", tintColor: "rgba(253,34,34,1)", }}
          leftButton={{ title: 'Back', }}
          rightButton={{ title: 'Forward', }}
          style={{ backgroundColor: "white", }}
          statusBar={{ tintColor: "white", }}
        />
         <ListView
        style={{marginTop: 20}}
        dataSource={this.state.dataSource}
        initialListSize = {this.state.listSize}
        renderRow={(pimages, sectionID, rowID) => { return this._renderImageRow(pimages, sectionID, rowID) }} />
      </ViewContainer>
    )
  }
  
  renderLoadingView() {
    return (
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animating={true}
            size={"large"}
            color={'black'}
          />
            <Text>
                Loading books...
            </Text>
        </View>
    );
}
  
  productDetails(prod){
      var verix= []
      console.log('prod text y')
      //console.log(prod)
      console.log(prod)
     // console.log(this.state.dropdownSelection)
     // console.log(this.state.variationData)
      
       this.state.variationData.map((vari) => {
         if (vari.product_id === prod.id){
           verix.push(vari);   
           console.log(verix)
         }
       })
       console.log(verix)
    return (
      verix.map(v => <MenuOption value={{title: v.title, sku: v.sku_number }}>
                       <Text>Title: {v.title} - Price: ${_.ceil(v.price,2)}</Text>
                     </MenuOption>
      )
   )         
  }
  
  _renderImageRow(pimages, sectionID, rowID) {
    console.log("pimages")
    console.log(pimages)
    console.log("rowID")
    console.log(rowID)
    console.log("the productIndex")
    console.log(_.findIndex(this.state.productData, { 'id': pimages.product_id }))
    console.log(_.findIndex(this.state.productData, function(o) { return o.id == pimages.product_id }))
    var x = _.findIndex(this.state.productData, { 'id': pimages.product_id })
    var product = this.state.productData[x]
    console.log(this.state.productData[x])
    var product = this.state.productData[x]
    var showRow = false
    console.log(this.state.imageHeight) 
          console.log(this.state.variationHeight)
   console.log('this.state.rowID')
   console.log(this.state.rowID)
    console.log('this.state.variationView')
   console.log(this.state.variationView)
   console.log('this.state.imageView')
   console.log(this.state.imageView)
   var variationView = false   
   var  imageView = true 
   
    if(rowID === this.state.rowID){
     if(this.state.variationView == true){
       console.log('trueeeeeeee')
        variationView = false   
        imageView = true 
     }else{
       console.log('Falseeeeeee')
        variationView = true   
        imageView = false 
     }        
    } 
          
  var viewImage =  <View style={styles.personRow} > 
      <Image 
        style={{width: width ,height: 450,}}
        resizeMode={"cover"}
        source={{uri: "https://s3.amazonaws.com/redberrry_photos/" + pimages.image_original}}
      />
    </View>
      
      
      
  var viewVar = <View style={{height: 450 ,  backgroundColor: 'rgba(255, 255, 255,.8)',}}>
              <Text> trying this out</Text>
              <MenuContext style={{ flex: 1 }}>
                <View style={styles.content}>
                  <Text style={styles.contentText}>
                    CHOOSE A SIZE
                  </Text>
                  <Menu style={styles.dropdown} onSelect={(sku) => this.setState({ dropdownSelection: sku })}
                    >
                    <MenuTrigger>
                      <Text>{this.state.dropdownSelection.title}</Text>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={[styles.dropdownOptions]}
                                 renderOptionsContainer={(options) => <ScrollView><Text>CHOOSE A SIZE....</Text>{options}</ScrollView>}>
                      {this.productDetails(product)}
                    </MenuOptions>
                  </Menu>
                </View>
              </MenuContext>
          </View>
    
    return (
      <View style={{height:520}} > 
        <TouchableOpacity onPress={() => this.toggleView(rowID)} >
          <View style={{ alignItems: "center", height:25, alignSelf: "stretch", justifyContent: 'center', overflow:'hidden', backgroundColor: 'white', flex: 1,  flexDirection: 'row'}} >
              <Text>{product.name} from </Text>
              <TouchableOpacity
                onPress={(event) => this._navigateToStore(product.store_id)}
                activeOpacity={25 / 100}>
                <Text style={{color:'red'}}>{product.company_name}</Text>
              </TouchableOpacity>
          </View>
           {variationView && viewVar}
           {imageView && viewImage}
        </TouchableOpacity>
        <Button
        containerStyle={{alignItems: "center", bottom:2, height:25, alignSelf: "stretch", overflow:'hidden', backgroundColor: 'red', flex: 1,  flexDirection: 'row', marginBottom: 20}}
        style={{fontSize: 20, color: 'white', justifyContent: 'center', alignItems: 'center', marginLeft:100 }}>
          Buy 
          <Icon size={20} name="heart" style={styles.heartIcon} />          
        </Button> 
               
      </View>
       
    )
  }
  
  _renderMoreInfo(product) {
    console.log("product")
    console.log(product)       
    return (
      <Modal 
          animationType={ "slide" }
          transparent={ true }
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
        <View style={{height:495}} > 
          <TouchableOpacity>
            <View style={{alignItems: "center", bottom:2, height:25, alignSelf: "stretch", justifyContent: 'center', overflow:'hidden', backgroundColor: 'white', flex: 1,  flexDirection: 'row'}} >
              <Text>hi world </Text>
            </View>
            <View style={styles.personRow} > 
              <Text>woot woot</Text>
            </View>
          </TouchableOpacity>               
        </View>
      </Modal>  
       
    )
  }

  _navigateToPersonShow(person) {
    this.props.navigator.push({
      ident: "PersonShow",
      person: person,
      //sceneConfig: Navigator.SceneConfigs.FloatFromBottom https://redberry.herokuapp.com/api/beta/products
    })
  }
  
  _navigateToStore(store) {
    this.props.navigator.push({
      ident: "Store",
      store: store,
      //sceneConfig: Navigator.SceneConfigs.FloatFromBottom https://redberry.herokuapp.com/api/beta/products
    })
  }
  
  toggleView(rowID) {
    console.log("toggle rowID")
    console.log(rowID)
    console.log("listSize rowID")
    console.log(parseInt(rowID)+3)
    var size = parseInt(rowID)+3
   // var data = this.state.dataSource
    
  	this.setState({
    	imageView: !this.state.imageView ,
        variationView: !this.state.variationView ,
        rowID: rowID,
        listSize: size
       // dataSource: data
    })
    
    this.forceUpdate()
    //     console.log('toggle variationView')
//    console.log(this.state.variationView)
//    console.log('toggle imageView')
//    console.log(this.state.imageView)
//    console.log('toggle rowID')
//    console.log(this.state.rowID)
  }
  
    componentWillReceiveProps( rowID ) {
        var data = this.state.dataSource
    this.setState({
        rowID: rowID,
        dataSource: data
    })
}

  componentDidMount() {
       this.fetchProducts();
   } 
  
   fetchProducts() {
       fetch("https://redberry.herokuapp.com/api/beta/products")
       .then((response) => response.json())
       .then((responseData) => {
         console.log("responseData")
         console.log(responseData)
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.images),
               productData: responseData.products,
               variationData: responseData.variations,
               isLoading: false
           });
       })
       .done();
   }

  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  personRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 450,
  },
  personName: {
    marginLeft: 25,
  },
  personMoreIcon: {
    color: "green",
    height: 30,
    width: 30,
    marginRight: 25,
  },
  heartIcon: {
    color: "white",
    alignItems: "center",
    height: 50,
    width: 50,
    marginTop:25,
    marginLeft: 100,
  },
  buttonContainer: {
    alignItems: "center",
    bottom:2, 
    height:25, 
    alignSelf: "stretch", 
    overflow:'hidden', 
    //borderRadius:6,  
    backgroundColor: 'red', 
    flex: 1,  
    flexDirection: 'row', 
    marginBottom: 8
  },  
  content: {
    //backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5,
  //  alignSelf: "stretch",
  },
  dropdownOptions: {
    //marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 300,
    //alignSelf: "stretch",
    //height: 200
  },
});

module.exports = PeopleIndexScreen
