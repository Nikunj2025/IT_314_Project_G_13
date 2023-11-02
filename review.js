var showmore=document.querySelector(".showmore");
var morebtn=document.querySelector(".more-btn");
var lessbtn=document.querySelector(".less-btn");
function showMore(){
   showmore.style.display="flex";
   morebtn.style.visibility="hidden";
   lessbtn.style.visibility="visible";
}
function showLess(){
   showmore.style.display="none";
   morebtn.style.visibility="visible";
   lessbtn.style.visibility="hidden";
}