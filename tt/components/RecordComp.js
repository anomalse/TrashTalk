import * as React from 'react';
import { Text, View} from 'react-native';
import{useEffect,useState} from 'react';
import { CameraType } from 'expo-camera';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
const RecordComp = (props) => {



    //how many secs to record?
    const [countDown, setCountDown] = useState(34);
    const [cameraRef, setCameraRef] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordState, setRecordState] = useState(1);
    const [cameraType, setType] = useState(CameraType.front);
  
    const stateRef = React.useRef();
    stateRef.current = countDown;
    stateRef.camera = cameraRef;

    let title_screen = "ALTAR OF\nCOMMUNITAS\n";
    

    useEffect(() => {
      
        setIsRecording(true);
        setRecordState(2);
       
        //give 200ms ... 
        setTimeout(()=>{
            startRecording(stateRef.camera);
           // console.log(stateRef.camera)
            
           //how long we are recording for ... 
            const intervalRecord = setInterval(()=>{ 
               
                if(stateRef.current > 0 ){
                 setCountDown((prevCountDown) => prevCountDown - 1);
                }
               else{
                    stopRecording(stateRef.camera);
                    clearInterval(intervalRecord);
                   
                 }
            
          
              },1000);
              return () => clearInterval(intervalRecord);

         },200)
     },[]);

    //function to startRecording
     async function startRecording(theRef) {
        try {
         console.log("start record")
      
            // console.log( theRef)
         
        const { uri, codec = "mp4" }  = await theRef.recordAsync();
           const type = `video/${codec}`;
           console.log("returned here");
           console.log(uri);
           if (uri) {
            console.log('now you have a uri');
            
            setRecordState(3);
            uploadFileToServer(uri);
          }
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }

      async function uploadFileToServer (fileURI){
        const fileInfo = await FileSystem.getInfoAsync(fileURI);
        if (!fileInfo.exists) {
            console.log("file does not exists");
           
          }
          else{
            console.log("file exists")
            try {
                const response = await FileSystem.uploadAsync(`http://10.115.137.175:5000/binary-upload`, fileURI, {
                  fieldName: 'file',
                  httpMethod: 'PATCH',
                  uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                });
                setRecordState(4);
                //BACK to start
                props.setTrashTalkState(1);
              } catch (error) {
                console.log(error);
              }
    
            console.log("FINISHED");
        }
    
    }

//to stop
  async function stopRecording(theRef) {
    theRef.stopRecording();
    console.log("stop record");
    setIsRecording(false);
    setRecordState(3);
  }


  //let screen_instruction_3 = "COMMUNE IN \n\n";
    return (

        // <ImageBackground
        //     style={props.styles.background}
        //     source={require('../images/bg/pink_2x.png')}>
        <View style = {props.styles.container}>
        
        <View style = {props.styles.titleContainer}> 
        <Text style = {props.styles.title}>{title_screen}</Text>
      </View>
             {/* //   RECORD AND COUNT DOWN */}
        {recordState === 1 ? (
         <View style = {props.styles.innerContainer}>
        <Text style = {props.styles.title}>COMMUNION ENDS IN {countDown} SECS </Text>
         </View>
          ) :recordState === 2 ?( 
          
        <View style = {props.styles.innerContainer}>
        <Camera type={cameraType} style={props.styles.camera} ref={(ref) => {setCameraRef(ref)}}/>

        <Text style = {props.styles.innerText}>COMMUNION ENDS IN {countDown} SECS </Text>
        </View>
        ) :recordState === 3 ?(  
          
          <View style = {props.styles.innerContainer}>
          <Text style =  {props.styles.innerText}>UPLOADING FILE NOW </Text>
          </View>
          ):recordState === 4 ?(  
          
         <View style = {props.styles.innerContainer}>
          <Text style =  {props.styles.innerText}>WELL DONE!</Text>
          </View>
          ):(<></>)
         } 
         <View style = {props.styles.footerContainer} /> 

      
      </View>

    // </ImageBackground>
    ); //return
    

}
export default RecordComp;