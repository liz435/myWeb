
let inputW=[];
let mod = "";
let idKey =" .:░▒▓█";
let button_submit;
let msg = "Don't think about it, just type something.      "

 let asciiDiv;
 
 function preload(){
 video = createCapture(VIDEO);
 }

 function setup() {
  var canvas = createCanvas(300, 300);
  canvas.parent('canvasForHTML');

   video.size(175,80);
   asciiDiv = createDiv();
   
   inputW = createInput("");
   inputW.input(data);
   inputW.position(1120, 550);
   inputW.size(220);
   inputW.style('font-size', '20px');
  
   button_submit = createButton("enter")
   button_submit.position(1250,590);
   button_submit.size(100);
   button_submit.mouseClicked(submit);

 }

 function submit(){
  mod = inputW.value();
  inputW.value(" ");
  idKey+=mod;
    return idKey
 }


 function data() {

}
 
 function draw() {
   video.hide();
   video.loadPixels();

   if(keyIsDown(13)){
    submit();
   }

   var div = createDiv('');
   div.html(msg);   
   div.position(1040, 600); 
   div.style('font-size', '24px');
   div.style('color', 'white');
   div.style('width',"300px")
   div.style('line-height','20px')

   let asciiImage = " ";
   for (let j = 0; j < video.height; j++) {
     for (let i = 0; i < video.width; i++) {
       const pixelIndex = (i + j * video.width) * 4;
       const r = video.pixels[pixelIndex + 0];
       const g = video.pixels[pixelIndex + 1];
       const b = video.pixels[pixelIndex + 2];
       const avg = (r + g + b) / 3;
       const len = idKey.length;
       const charIndex = floor(map(avg, 0, 255, 0, len));
       const c = idKey.charAt(charIndex);
       if (c == " ") asciiImage += ("&nbsp;");
       else asciiImage += c;
     }
     asciiImage += '<br/>';
   }
   asciiDiv.html(asciiImage);
 }
 