

  var context;
  var canvasWidth = 320;
  var canvasHeight = 480;
  var canvas;
  var img;
  var scale;
  var bgImage;
  self = this;
  var btn = document.getElementById('btn');
  var increase = document.getElementById('increase');
  var decrease = document.getElementById('decrease');
  var kazaam = document.getElementById('kazaam');
  var offsetX = 0;
  var offsetY = 0;
  var canvCont;

  var wigHeight = 128;
  var wigWidth = 128;
  var hairHeight = 0;

  var currentX = 0;
  var currentY = 0;
  var currentType;;

  var hairTypeList;

  var imagePath = "images/";
  var hornPath = "images/horns/"
  var hairExtension = ".png";

  var isDragging = false;


function init() {
  //btn.addEventListener("click",buttonClick,false);
  increase.addEventListener("click",scaleHair,false);
  decrease.addEventListener("click",scaleHair,false);
  kazaam.addEventListener("click",onKazaam,false);

   

  self.hairTypeList = document.querySelector('#hairtypes').querySelectorAll('li');

  for(var i=0;i<self.hairTypeList.length;i++) {
    self.hairTypeList[i].addEventListener('mousedown',onHairTypeSelect);
    
  }
}

function buttonClick(event) {
   //event.preventDefault();

   if(document.getElementById('canvcont')) {
      self.canvCont = document.getElementById('canvcont');
      self.canvCont.innerHTML = "";
    }else {
      var container = document.getElementById('contain');
      container.innerHTML = '<div id="canvcont"></div>';
      init();
    }

    var files=document.getElementById("upload").files;

    var img = new Image();
    var fileReader= new FileReader();
    fileReader.onload = (function(img) { return function(e) { img.src = e.target.result; }; })(img);
    fileReader.readAsDataURL(files[0]);

     
    
    img.addEventListener("load",function(event){

        //CANVAS
        //  create canvas element that is used as a container
        //  to resize the image
        self.bgImage = event.target;
        self.scale = (event.target.height / event.target.width);
        self.canvas = document.createElement("canvas");
        self.canvas.width = 320;
        self.canvas.height = 320 *self.scale// / 8;
        self.canvasHeight = 320*self.scale;
        self.context = self.canvas.getContext("2d");
        self.canvCont.style.height = self.canvasHeight+"px"
        // context.drawImage(event.target,0,0,event.target.width,event.target.height);


        self.context.drawImage(self.bgImage,0,0,320,320*self.scale);
        self.canvCont.appendChild(self.canvas);
        setStep(2)
      },false)

    enableSelectHair()

}

function enableSelectHair() {
    onHairSelected();
}

function onHairTypeSelect(e) {
  
  var type = e.currentTarget.getAttribute('type');
  self.img.src = self.imagePath+type+self.hairExtension;
  self.currentType = type;
  console.log(type)
}

function onHairSelected() {
  self.img = new Image();

  self.img.onload = function(){
    
   canMouseX = 0;
   canMouseY = 0;
   render(false);
   self.hairHeight = self.img.height;
  };
  //self.img.src = "hair1";

    addDragHandlers(true);

}

function addDragHandlers(addHandlers) {
  if(addHandlers) {
    self.canvCont.addEventListener('mousedown',handleMouseDown,false);
    self.canvCont.addEventListener('mouseup',handleMouseUp,false);
    self.canvCont.addEventListener('mouseout',handleMouseOut,false);
    self.canvCont.addEventListener('mousemove',handleMouseMove,false);
  }else {
    self.canvCont.removeEventListener('mousedown',handleMouseDown,false);
    self.canvCont.removeEventListener('mouseup',handleMouseUp,false);
    self.canvCont.removeEventListener('mouseout',handleMouseOut,false);
    self.canvCont.removeEventListener('mousemove',handleMouseMove,false);
  }
}

function handleMouseDown(e){
  canMouseX=parseInt(e.clientX -offsetX);
  canMouseY=parseInt(e.clientY -offsetY);
      // set the drag flag
      isDragging=true;
}

function handleMouseUp(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // clear the drag flag
  isDragging=false;
}

function handleMouseOut(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // user has left the canvas, so clear the drag flag
  //isDragging=false;
}

function handleMouseMove(e){
    var bRect = self.canvas.getBoundingClientRect();
    mouseX = (e.clientX - bRect.left)*(self.canvas.width/bRect.width);
    mouseY = (e.clientY - bRect.top)*(self.canvas.height/bRect.height);

  canMouseX = mouseX;
  canMouseY = mouseY;
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging){
   
      render(true);
  }
}

function render(isDragging) {

   if(isDragging) {
      //self.currentX = canMouseX-128/2;
      //self.currentY = canMouseY-120/2;
      self.currentX = canMouseX-self.wigWidth/2;
      self.currentY = canMouseY-self.wigHeight/2;
    }

    context.clearRect(0,0,canvasWidth,canvasHeight);
    self.context.drawImage(self.bgImage,0,0,320,320*self.scale);

  
      context.drawImage(img,self.currentX,self.currentY,self.wigWidth,self.wigHeight);
   
    
}

function setStep(step) {

  var step1 = document.querySelectorAll('.step1');
  var step2 = document.querySelectorAll('.step2');
  var step3 = document.querySelectorAll('.step3');

  for(var i=0;i<step1.length;i++) {
    step1[i].style.display = "none";
  }

  for(var i=0;i<step2.length;i++) {
    step2[i].style.display = "none";
  }

   for(var i=0;i<step3.length;i++) {
    step3[i].style.display = "none";
  }
  var currentStep = document.querySelectorAll('.step'+step)

  for(var i=0;i<currentStep.length;i++) {
    currentStep[i].style.display = "block";
  }
}

function scaleHair(e) {
  var scaleFactor = parseInt(e.target.getAttribute('scaleby'),10)
  console.log(scaleFactor)
  self.wigWidth += scaleFactor;
  self.wigHeight += scaleFactor;
  console.log(self.wigWidth)
  console.log(self.wigHeight)
  render(false);
}

function onKazaam() {

console.log(player)
setStep(3);

  var player1 = document.getElementById('player');
  player1.style.opacity = 1;

 self.img.src = self.hornPath + self.currentType + self.hairExtension;

  addDragHandlers(false)
  render(false);

  setTimeout(function() {
     var oImg = Canvas2Image.saveAsPNG(self.canvas,true);  // will prompt the user to save the image as PNG.  
    if (!oImg) {
        alert("Sorry, this browser is not capable of saving " + strType + " files!");
        return false;
      }

      oImg.id = "canvasimage";

      oImg.style.border = self.canvas.style.border;
      var container = document.getElementById('contain');

     container.replaceChild(oImg, canvCont);
    
  },100)
 
}

init();