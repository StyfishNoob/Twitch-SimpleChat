'use strict';

 window.onload = function(event){
   chrome.storage.local.get(["key_NGarray","key_NGuser"], function(result){
     if(result.key_NGarray){
       let filter = result.key_NGarray.filter(Boolean);
       chrome.storage.local.set({key_NGarray: filter});
     }

     if(result.key_NGuser){
       let filter = result.key_NGuser.filter(Boolean);
       chrome.storage.local.set({key_NGuser: filter});
     }

     chrome.storage.local.get(["key_NGarray"], function(result){
       if(result.key_NGarray && result.key_NGarray.length > 0){
         chrome.storage.local.get(["key_NGarray"], function(value){
           for(var i = 0; i < value.key_NGarray.length; i++){
             if(result.key_NGarray[i]){
               var spanID = "lispan_word" + i;
               var buttonID = "word_" + i;
               var insHTML = "<div class='lidiv'><li><span class='lispan' id=" + spanID + " >" + value.key_NGarray[i] + "</span><button type='button' id=" + buttonID + ">DEL</button></li></div>";
               ListNGword.insertAdjacentHTML("beforeend", insHTML);
             }
           }
         })
       }else{
         var insHTML = "<div class='NGli'><li>Blkword has not been added!</li></div>";
         ListNGword.insertAdjacentHTML("beforeend", insHTML);
       }
     })
   })

   chrome.storage.local.get(["key_NGuser"], function(result){
     if(result.key_NGuser){
       let filter = result.key_NGuser.filter(Boolean);
       chrome.storage.local.set({key_NGuser: filter});
     }

     chrome.storage.local.get(["key_NGuser"], function(result){
       if(result.key_NGuser && result.key_NGuser.length > 0){
         chrome.storage.local.get(["key_NGuser"], function(value){
           for(var i = 0; i < value.key_NGuser.length; i++){
             if(result.key_NGuser[i]){
               var spanID = "lispan_user" + i;
               var buttonID = "user_" + i;
               var insHTML = "<div class='lidiv'><li><span class='lispan' id=" + spanID + " >" + value.key_NGuser[i] + "</span><button type='button' id=" + buttonID + ">DEL</button></li></div>";
               ListNGuser.insertAdjacentHTML("beforeend", insHTML);
             }
           }
         })
       }else{
         var insHTML = "<div class='NGli'><li>Blkuser has not been added!</li></div>";
         ListNGuser.insertAdjacentHTML("beforeend", insHTML);
       }
     })
   })
 }

 var delNG_function = function(value){
   let id = value.target.id;
   let num = id.replace(/[^0-9]/g, "");

   if(id.indexOf("word") != -1){
     var temparray = new Array(0);
     var spanID = "lispan_word" + num;
     var spanElem = document.getElementById(spanID);

     chrome.storage.local.get(["key_NGarray"], function(result){
       temparray = result.key_NGarray;
       delete temparray[num];
       chrome.storage.local.set({key_NGarray: temparray});
     })
   }

   if(id.indexOf("user") != -1){
     var temparray = new Array(0);
     var spanID = "lispan_user" + num;
     var spanElem = document.getElementById(spanID);

     chrome.storage.local.get(["key_NGuser"], function(result){
       temparray = result.key_NGuser;
       delete temparray[num];
       chrome.storage.local.set({key_NGuser: temparray});
     })
   }

   deletedWord:{
     spanElem.classList.add("deletedWord");
   }
 }

 var allclearWord_function = function(){
   let list = document.getElementById("ListNGword");
   let temp = new Array(0);

   chrome.storage.local.set({key_NGarray: temp});
   alert("");

   while(list.firstChild){
     list.removeChild(list.firstChild)
   }

   var insHTML = "<div class='NGli'><li>Blkword has not been added!</li></div>";
   ListNGword.insertAdjacentHTML("beforeend", insHTML);
 }

 var allclearUser_function = function(){
   let list = document.getElementById("ListNGuser");
   let temp = new Array(0);

   chrome.storage.local.set({key_NGuser: temp});
   alert("DELETE ALL!");

   while(list.firstChild){
     list.removeChild(list.firstChild)
   }

   var insHTML = "<div class='NGli'><li>Blkuser has not been added!</li></div>";
   ListNGuser.insertAdjacentHTML("beforeend", insHTML);
 }

 document.body.addEventListener("click", delNG_function);
 allClearW.addEventListener("click", allclearWord_function);
 allClearU.addEventListener("click", allclearUser_function);
