import * as React from 'react';
import {View, Text} from 'react-native';
import{ useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../context/socket';
import { Camera } from 'expo-camera';



export default function Splash(props) {
  //camera enabled var
  const [startCamera,setStartCamera] = useState(false); 
 
  //state in the narrative
  const [trash_talk_state, setTrashTalkState] = useState(0);
  
  //socket request
  const [connected, setConnected] = useState(false);

  const socket = useContext(SocketContext);

  const handleInviteAccepted = useCallback(() => {
    console.log("success");
    setConnected(true);
    requestCameraPermissions();
    //props.setTrashTalkState(1);
  }, []);

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socket.on("JOIN_REQUEST_ACCEPTED", handleInviteAccepted); 

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);
    };
  }, [socket, handleInviteAccepted]);


  //will be triggered when camera is ready
  const setCamPermission = (value) =>{
    setStartCamera(value);

  }



  // 2: THIS IS CALLED AFTER THE REQUEST TO SOCKET HAS BEEN MADE AND ACCEPTED
  const requestCameraPermissions = async() => {
    console.log("request camera permissions")
    const {status} = await Camera.requestCameraPermissionsAsync();
      
   if(status ==='granted'){
     // do something
     console.log("granted and start detection")
     setCamPermission(true);

    //  const codecs = await Camera.getAvailableVideoCodecsAsync();
    //  //setAvilableCodecs(codecs);
    //  console.log({ codecs });
    //  props.setSelectedCodec(Camera.Constants.VideoCodec.JPEG)
   
     //go to next state
     props.setTrashTalkState(1);
     
 }else{
    
    Alert.alert("Access denied")
   }


  }


  let screen_instruction = "ALTAR OF\nCOMMUNITAS\n WAITING FOR SERVER CONNECTION "
  return (
   
      <View style = {props.styles.splashContainer}> 
      <Text style = {props.styles.titleSplash}></Text>
      <Text style = {props.styles.titleSplash}> {screen_instruction}</Text>
   </View>
    

  );
}


