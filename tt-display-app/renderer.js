//client side script ...
//https://www.electronjs.org/docs/latest/tutorial/ipc

document.getElementById('test-video-mdes').addEventListener('ended',newVideoHandler,false);

async function newVideoHandler(e) {
    // What you want to do after the event
  //document.getElementById("echo").innerHTML = "done";
  //send message to electron !
  window.electronAPI.setVideoMessage("done");
  const filePath = await window.electronAPI.getFile();
  window.requestAnimationFrame(crossFade);
  let opacity =1;
  let dir = -.01;
  function crossFade(){
    //fadeout
    if(dir === -.01 && opacity> 0){
      console.log(opacity);
    document.getElementById("test-video-mdes").style.opacity = opacity;
    opacity = opacity+dir;
    window.requestAnimationFrame(crossFade);
    if(opacity<=0){
      dir =.01;
        document.getElementById("video-src").setAttribute("src",filePath);
        document.getElementById("test-video-mdes").load();
    }

    }
    //other dir... fade in
    if(dir === .01 && opacity< 1){
      document.getElementById("test-video-mdes").style.opacity = opacity;
      opacity = opacity+dir;
      window.requestAnimationFrame(crossFade);
    }


   
  }

}
