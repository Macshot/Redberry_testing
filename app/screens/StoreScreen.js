'use strict'

import NavigationBar from 'react-native-navbar'
import React, { Component, } from 'react'
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
  Animated,
  ScrollView,
  Modal,
} from 'react-native'
//var Dimensions = require('Dimensions');
import ViewContainer from '../componets/ViewContainer'
import StatusBarBackground from '../componets/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button'
import GridView from 'react-native-grid-view'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
// There is another version. I'm unsure which one give the best UX. 
// import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll'; 

var {
  width,
  height
} = Dimensions.get('window')

var imageWidth = (width / 3) 

var GREY = 0
var GREEN = 1
var RED = 2
var values = [1,2,3,4]
var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

 //console.log(this.props.store)
 
class StoreScreen extends Component {

  static propTypes = {}

  static defaultProps = {}
  
 

  constructor(props) {
    super(props)
    this.state = {
      storeName: '',
      productImages: "",
      products: "",
      productsVariations: "",
      storeDescription: "",
      stores: null,
      reviewCount: null,
      prod: null,
      x: null,
      isLoading: true,
      imageView: false,
      width: null,
      width2: null,
      height: null,
      modalVisible: false,
      dropdownSelection: { title: '-- Choose --'},
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
      
    }
  }

  render() {
     if (this.state.isLoading ) {
           return this.renderLoadingView();
       }
    
    return (
           
        <View style={styles.container}>
         <NavigationBar
              title={{ title: this.state.storeName , tintColor: 'black', }}
              leftButton={{ title: <Icon name="angle-left" size={24} />, }}
              rightButton={{ title: 'Forward', }}
              style={{ backgroundColor: "white", }}
              statusBar={{ tintColor: "white", }}
            />
         <SwipeableViews style={styles.slideContainer}
           index={1}
           onSwitching= {(event) => this.handleScroll2(event)}
           >
          <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>
            </Text>
          </View>
          <View style={[styles.wrapper]}>
            <View style={styles.topHalf}>
              <View ref='welcome' style={styles.topHalfs1}
                 onLayout= {(event) => this.getViewDim(event)}>
                <Image 
                resizeMode={"cover"}
                source={require('../assets/img/StorePage_top_img.png')}
                style={{height: this.state.height, width: this.state.width}}
              />
              </View>
              <View style={styles.topHalfs2}> 
                 <Image 
                   style={{
                     marginLeft: 22,
                     width:  75 ,
                     height:  75 ,
                     borderRadius:37.5,
                    bottom: 35,
                   }}                   
                   source={{uri:'https://unsplash.it/600/400/?random'}}
                 />
                <TouchableOpacity
                   onPress={() => {}}
                   activeOpacity={25 / 100}
                   style={[styles.button]}>    
                      <Text style={{color: '#3688d5'}}>
                        Add Store To My Mall
                      </Text>
                 </TouchableOpacity>
              </View>
              <View style={styles.topHalfs3}>
                <View style={styles.reviewRow}>
                  <View style={{flexDirection: 'row',}}>
                    <Text style={styles.text} >{this.state.reviewCount} Product Reviews </Text>
                    <Icon name="angle-right" size={20} />
                  </View>
                  <View style={{flexDirection: 'row'}} >
                    <Icon name="star" size={20} color='gold' />
                    <Icon name="star" size={20} color='gold' />
                    <Icon name="star" size={20} color='gold' />
                    <Icon name="star" size={20} color='gold' />
                    <Icon name="star" size={20} color='gold'  style={{ alignSelf:'flex-end'}} />
                  </View>
                </View>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut efficitur mi. 
                  Sed sed nunc justo. Praesent dictum lectus id neque sagittis lacinia.
                </Text>
              </View>
            </View>
            <View style={styles.lowerHalf}> 
              <ListView contentContainerStyle={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={(prod) => { return this._renderProductRows(prod) }}
              />
            </View>
            
          </View>
           <View style={[styles.slide, styles.slide3]}>

          </View>
        </SwipeableViews>
        
        {this.showProductModal()}      
        
      </View>
    )
  }
  
//{this._renderRow()}
  
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
  
  _renderRow (value, index) {
    return (
        
          <View 
            style ={styles.wrapper} >
            <View style={styles.topHalf}>
              <Text>{value + "  <----- Slide the row that way and release"}</Text>
            </View>
            <View style={styles.lowerHalf} >
            </View>
          </View>
        
    )
  }
  
  _renderProductRows(prod) {    
    return (      
      <TouchableOpacity
               onPress={() => {this.showProductModal(prod)}}
               activeOpacity={25 / 100}
                style={styles.rows}>
        <Image style={styles.thumb} 
          source={{uri: "https://s3.amazonaws.com/redberrry_photos/" + prod.image_thumb}}/>
      </TouchableOpacity>

    )
  }

  componentDidMount() {
    //setTimeout(this.measureProgressBar())
   // this.measureProgressBar()    
    this.fetchProducts()
   } 
  
   fetchProducts() {
     console.log('store')
     console.log(this.props.store)
     
     console.log('imageWidth')
     console.log(imageWidth)
     
     var store = null
   //  var stores = null
     
     if(this.props.store){
      store = this.props.store
     }else{
       store = 47 // could make this the store of the week or a store who pays for this spot
     }
     
       fetch("https://redberry.herokuapp.com/api/beta/stores/"+store)
       .then((response) => response.json())
       .then((responseData) => {
         console.log("responseData")
         console.log(responseData)
         console.log(responseData.store.company_name)
         //console.log(responseData.store.variations)
         
           this.setState({
               storeName: responseData.store.company_name,
               storeDescription: responseData.store.motto,
               productImages: responseData.store.images,
               products: responseData.store.products,
               productsVariations: responseData.store.variations,
               reviewCount: responseData.store.reviews.length,
               dataSource: this.state.dataSource.cloneWithRows(responseData.store.images),
           });
       })
       .done();
     
     fetch("https://redberry.herokuapp.com/api/beta/stores/")
       .then((response) => response.json())
       .then((responseData) => {
         var stores = []
         responseData.sellers.map((x) => stores.push(x.id))
         console.log(stores)
           this.setState({
               isLoading: false,
               stores: stores
           });
       })
       .done();
     
     /* <ScrollView
            horizontal={true}
            directionalLockEnabled={true}
            onScroll={(event) => this.handleScroll(event)}
            scrollEventThrottle={50}
            style ={styles.wrapper}
          > */
   }
  

  getViewDim(event) {
    this.setState({
      	width: event.nativeEvent.layout.width,
       	height: event.nativeEvent.layout.height
    })
  }
                       
  handleScroll2 (event: event){
    console.log(event)
    
    if(this.state.waitingToLoad === true){
      return 
    }
    
     if ( event >= 1.55 ) {
      console.log('yup')
      this.setState({waitingToLoad: true,})
      this._navigateToStore('next')
    }else if  ( event <= .55 ) {
      console.log('yup')
      this.setState({waitingToLoad: true,})
      this._navigateToStore('perv')
    } 
    
     
  }
  
  setModalVisible(visible) {
    console.log('visible')
    console.log(visible)
    this.showProductModal()
    this.setState({modalVisible: visible})
    console.log('test')
    console.log(this.state.modalVisible)
  }
  
  test(){
    var text = ['aaaa', 'bbbb', 'cccc']
    return (
    text.map(t => <Text>{t}</Text>)
            )           
  }
      
  testx(){
      if(this.state.prod){
      var verix= []
      console.log('prod text x')
      //console.log(prod)
      console.log(this.state.prod)
      
      
       this.state.productsVariations.map((vari) => {
       if (vari.product_id === this.state.prod.product_id){
         verix.push(vari);   
         
       // veriList = <Text>{`${vari.title}`}</Text>  
      //   console.log(veriList)
       }
    })
    return (
    verix.map(v => <Text>Title: {v.title}</Text>)
            )          
      }
      return
  }
      
   testy(){
      if(this.state.prod){
      var verix= []
      console.log('prod text y')
      //console.log(prod)
      console.log(this.state.prod)
      console.log(this.state.dropdownSelection)
      
      
       this.state.productsVariations.map((vari) => {
       if (vari.product_id === this.state.prod.product_id){
         verix.push(vari);   
         
       // veriList = <Text>{`${vari.title}`}</Text>  
         console.log(verix)
       }
    })
    return (
    verix.map(v => <MenuOption value={{title: v.title, sku: v.sku_number }}>
                     <Text>Title: {v.title} - Price: ${_.ceil(v.price,2)}</Text>
                   </MenuOption>
             )
            )          
      }
      return
  }
  
  showProductModal(prod){
    console.log('no')
    console.log(this.state.modalVisible)
    console.log('yes')
    console.log(this.state.modalVisible)
    console.log('test2')
    console.log(this.state.modalVisible)
    console.log('prod')
    console.log(prod)
    var verix=[] 
    var veriList = null
    if(prod){
      this.setState({modalVisible: true, prod: prod, imageView: true})
      console.log('xxxxxxxxx')
      console.log(this.state.modalVisible)
     console.log('yessssssss') 
     console.log(prod.id) 
     console.log(prod.product_id)
     
     this.state.productsVariations.map((vari) => {
      // console.log(vari)
       if (vari.product_id === prod.product_id){
       //  console.log(vari)
         verix.push(vari);   
         
        veriList = <Text>{`${vari.title}`}</Text>
         
        
         console.log(veriList)
       }
    })
    
     console.log(verix) 
     console.log({veriList}) 
      var text = ['aaaa', 'bbbb', 'cccc']
     
     verix.map(eachName => 
                           
                     console.log(eachName.title)      
                      )
    }
    
    if(this.state.prod){
      console.log('momma we made it')
      var id = this.state.prod.id
       var viewImage =  
              <Image 
                style={{width: 400,height: 400,}}
                resizeMode={"cover"}
                source={{uri: "https://s3.amazonaws.com/redberrry_photos/" + this.state.prod.image_original}}
              />
           
           
   //   var veriList = <Text>hi</Text>    
    }
    else{
      console.log('nope')
      var id = 'hi'
    }
    return (   
        <Modal 
          animationType={ "slide" }
          transparent={ true }
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255,.8)',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
            style={{ marginTop: 30, marginRight:5, marginBottom:3, flexDirection: 'row',alignSelf: 'flex-end', }}>
              <Icon name="times" size={24}  color='red' />
            </TouchableHighlight>
            <ScrollView              
              showsVerticalScrollIndicator={false}>
              {viewImage}
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
                      {this.testy()}
                    </MenuOptions>
                  </Menu>
                </View>
              </MenuContext>
           </ScrollView>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={ 25  / 100}
              style={{alignItems: "center", height:35, alignSelf: "stretch", justifyContent: 'center', overflow:'hidden', backgroundColor: 'red', flexDirection: 'row'}}>
              <Text style={{ color: 'white' }}>Buy</Text>
               <Icon size={20} name="heart" style={styles.heartIcon} />    
            </TouchableOpacity>
          </View>
        </Modal>      
      )
    
    
  }
        
        
  
   _navigateToStore(direction) {    
     
     console.log('direction')
     console.log(direction)     
     
     var oldStores=[]
     
     if (direction === 'next') {
       if(this.props.stores){
         oldStores = this.props.stores
       console.log('got oldStores')
       console.log(oldStores)
       console.log(' cuurentStore')
           console.log(this.props.store)
         var id = _.indexOf(oldStores, this.props.store)
         var lastId = _.findLastIndex(oldStores)
         console.log(' id')
           console.log(id)
           console.log(' lastId')
           console.log(lastId)
         if(id === -1 || id === lastId){
           console.log(' no id')
           console.log(id)
           oldStores.push(this.props.store)
           var newStores = _.difference(this.state.stores, oldStores)
           var nextStore= _.sample(newStores)
         } else {
           console.log('got id')
           console.log(id)
            var nextStore = oldStores[(id+1)]
         }
       } else {
         oldStores.push(this.props.store)
       }

         this.props.navigator.push({
            ident: "Store",
            store: nextStore,
            stores: oldStores,
            //sceneConfig: Navigator.SceneConfigs.FloatFromBottom https://redberry.herokuapp.com/api/beta/products
          })
     } else {
       
       if(this.props.stores){
         oldStores = this.props.stores
        // oldStores.push(this.props.store)
       } else {
        console.log('No More Stores')
        return
       }
       
       console.log('oldStores')
       console.log(oldStores)
      console.log('currentStores')
       console.log(this.props.store)
        console.log(_.indexOf(oldStores, this.props.store) )
       
       var prevStore = _.indexOf(oldStores, this.props.store) 
        if(prevStore === -1){
          oldStores.push(this.props.store)
          prevStore = _.indexOf(oldStores, this.props.store)
          console.log('prevStore')
          console.log(prevStore)
          prevStore = prevStore -1
          prevStore = oldStores[prevStore]
        } else {
          console.log('prevStore')
          console.log(prevStore)
           prevStore = prevStore -1
          prevStore = oldStores[prevStore]
        }
//        console.log('prevStore')
//        console.log(prevStore)
//        console.log('prevStore')
//        prevStore = prevStore -1
//        console.log(prevStore)
//        prevStore = oldStores[prevStore]
//        console.log('prevStore')
//        console.log(prevStore)
       
        this.props.navigator.replace({
          ident: "Store",
          store: prevStore,
          stores: oldStores, 
          //sceneConfig: Navigator.SceneConfigs.FloatFromBottom https://redberry.herokuapp.com/api/beta/products
        }) 
     }
  }
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 45,
  },
  outerScroll: {
    flex: 1,
  },
  row: {
    flex: 1
  }, 
  text:{
    fontSize: 15,
  },
  wrapper:{
    flex: 1,
    flexDirection: 'column',
//     borderWidth: 4,
//     borderColor: 'red',
    
  }, 
  topHalf: {
    flex: 2,
    marginBottom: 20,
//     borderWidth: 4,
//     borderColor: 'green',
  }, 
  lowerHalf: {
    flex: 4,
    marginRight: 10,
    marginLeft: 10,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
//     borderWidth: 4,
//     borderColor: 'blue'
  },
  slideContainer: {
   flex: 1
  },
  reviewRow:{
    flex: 1,
    flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: 'red',
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewStar:{
    justifyContent: "flex-end",
    paddingRight: 5,
  },
  topHalfs1:{
    flex: 5,
//     borderWidth: 4,
//     borderColor: 'blue',
  },
  topHalfs2:{
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
//     borderWidth: 4,
//     borderColor: 'blue',
  },
  topHalfs3:{
    flex: 5,
    marginRight: 10,
    marginLeft: 10,
//     borderWidth: 4,
//     borderColor: 'blue',
  },
  button:{
    borderWidth: 2,
    height: 35,
    width: 175,
    borderRadius:4,
    marginRight:10,
    justifyContent: 'center',
    alignSelf: 'center', // y-axis 
    alignItems: 'center',
    borderColor: '#3688d5',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
   // borderWidth: 2
  },
  item: {
    backgroundColor: '#CCC',
    width: 110,
    height: 110
    },
  rows: {
    justifyContent: 'center',
    margin: 5,
    width: imageWidth - 20,
    height:  imageWidth - 1.25,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
   // borderWidth: 1,
   // borderRadius: 5,
  //  borderColor: '#CCC'
  },
  thumb: {
    width: imageWidth - 20,
    height: imageWidth - 1.25,
  //  borderWidth: 1,
    //borderColor: '#CCC'
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
  heartIcon: {
    color: "white",
    alignItems: "center",
    height: 50,
    width: 50,
    marginTop:25,
    marginLeft: 100,
  },

});
export default StoreScreen