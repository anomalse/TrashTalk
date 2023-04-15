import * as React from 'react';
import {View,StyleSheet,ImageBackground} from 'react-native';
import{ useState} from 'react';

import Splash from './components/Splash.js'
import WaitingComp from './components/WaitingComp.js'
import FaceComp from './components/FaceComp.js';
import RecordComp from './components/RecordComp.js';

import {SocketContext, socket} from './context/socket';

export default function App() {
  //state in the narrative
  const [trash_talk_state, setTrashTalkState] = useState(0);

 // to go to the next step ...
  const setNextTrashTalkState = (value) =>{
    setTrashTalkState(value);

  }


  return (
    <View style={styles.container}>
       <ImageBackground style={styles.background}
    source={require('./images/bg/pink_2x.png')}>
        <SocketContext.Provider value={socket}>
       {trash_talk_state === 0 ? (
     <Splash styles = {styles} setTrashTalkState = {setTrashTalkState}/>
      ):trash_talk_state === 1 ? (
          <WaitingComp styles = {styles} setTrashTalkState = {setTrashTalkState}/>
        ):trash_talk_state === 2 ? (
            <FaceComp styles = {styles} setTrashTalkState = {setTrashTalkState}/>
         ): trash_talk_state === 3 ? (
            <RecordComp styles = {styles} setTrashTalkState = {setTrashTalkState}/>
        ): (<></>)}
        </SocketContext.Provider>
        </ImageBackground>
    </View>
    

  );
}

const styles = StyleSheet.create({


/* BEFORE START*/
  splashContainer:{
    flex: 9,
    marginLeft:24,
    marginBottom:24,
    marginTop:64

  },
  
  titleSplash:{
    fontSize: 28,
    fontWeight: "bold",
    paddingTop:24,
    color:'rgba(255,0,239,1)',
  },

  /* ONCE CONNECTED*/
  background:{
    flex:9

   } ,
  container: {
    flex: 9,
    padding: 0,
    flexDirection:"column",
   
  },
  innerContainer:{
    backgroundColor:'rgba(255,0,239,0.8)',
    flex:6,
   marginLeft:32,
   marginRight:32,
   borderRadius:"40px",
  },
  innerText:{
    fontSize: 28,
    //fontWeight: "bold",
// color:'rgb(255,0,239)'
    // color:'rgba(15,15,15,1)',
    color:'rgba(255,255,255,1)',
    padding:32
},
  titleContainer: {
    flex: 2,
    marginLeft:24,
    marginBottom:36,
    marginTop:24

  },
  
  title:{
    fontSize: 48,
    fontWeight: "bold",
    paddingTop:12,
    lineHeight:56,
   //color:'rgb(255,0,0)'
    color:'rgba(255,0,239,1)',
    textShadowColor: 'rgba(0,0,0,.5)',
    textShadowOffset: {width: 8, height: 8},
    textShadowRadius: 4

  },
  footerContainer: {
    flex: 1,
    marginLeft:24,
    marginBottom:24,

  },
  camera:{
    flex: 5,
    width:"100%"
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
