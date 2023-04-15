import * as React from 'react';
import {View, Text} from 'react-native';
import{ useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../context/socket';

const WaitingComp = (props) => {

    const [flushDetected, setFlushDetected] = useState(0);
    const socket = useContext(SocketContext);

    const handleFlush = useCallback(() => {
        console.log("have a flush");
        setFlushDetected(true);
        props.setTrashTalkState(2);
      }, []);


  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socket.on("GOT_FLUSH", handleFlush); 
  

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("GOT_FLUSH", handleFlush);
    };
  }, [socket, handleFlush]);

let screen_instruction = "FLUSH TOILET TO RECORD YOUR TRASH TALK OR SONG FOR 34 SECONDS";
let title_screen = "ALTAR OF\nCOMMUNITAS\n";


    return (

        // <ImageBackground
        //     style={props.styles.background}
        //     source={require('../images/bg/pink_2x.png')}>
        <View style = {props.styles.container}>
       <View style = {props.styles.titleContainer}> 
         <Text style = {props.styles.title}> {title_screen}</Text>
      </View>
      <View style = {props.styles.innerContainer}>
        <Text style = {props.styles.innerText}>{screen_instruction}</Text> 
      </View>
      <View style = {props.styles.footerContainer} /> 
      
      </View>

    // </ImageBackground>
    ); //return
    

}

export default WaitingComp;
