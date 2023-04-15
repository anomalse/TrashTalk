import * as React from 'react';
import { Text, View} from 'react-native';
import{useEffect,useState} from 'react';



const FaceComp = (props) => {

    let title_screen = "ALTAR OF\nCOMMUNITAS\n";
    const COUNTDOWN =3;
    const [countDown, setCountDown] = useState(COUNTDOWN);
    const stateRef = React.useRef();
    stateRef.current = countDown;

       //TEST
  useEffect(() => {

    //run the count down
   const intervalAni = setInterval(()=>{ 
     
     console.log("in here::: "+stateRef.current);
     
     if(stateRef.current > 0 ){
         console.log("herereer");
         setCountDown((prevCountDown) => prevCountDown - 1);
     }
     //count down done
     else
     {
         clearInterval(intervalAni);
        props.setTrashTalkState(3);

     }
    },1000);
   


}, []);

return(
    // <ImageBackground
    // style={props.styles.background}
    // source={require('../images/bg/pink_2x.png')}>
    <View style = {props.styles.container}>
        <View style = {props.styles.titleContainer}> 
        <Text style = {props.styles.title}>{title_screen}</Text>
        </View>
    <View style = {props.styles.innerContainer}>
        {/* <Text style = {props.styles.innerText}>{screen_instruction}</Text>  */}
        <Text style = {props.styles.innerText}>COMMUNE IN {countDown} SECS </Text>
        </View>
    <View style = {props.styles.footerContainer} /> 
     </View>
    // </ImageBackground> 
 )

}

export default FaceComp;