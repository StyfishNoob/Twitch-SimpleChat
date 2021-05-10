'use strict';

 window.onload = function(event){
   chrome.storage.local.get(["key_NGarray"], function(result){
     if(result.key_NGarray.length > 0){
       console.log(result.key_NGarray.length + "if")
       sortArray:{
         var temparray = new Array(0);
         var sortarray = new Array(0);

         temparray = result.key_NGarray;
         sortarray = temparray.filter(Boolean);
         chrome.storage.local.set({key_NGarray: sortarray});
       }

       chrome.storage.local.get(["key_NGarray"], function(value){
         for(var i = 0; i < value.key_NGarray.length; i++){
           if(result.key_NGarray[i]){
             var spanID = "lispan" + i;
             var insHTML = "<div class='lidiv'><li><span class='lispan' id=" + spanID + " >" + value.key_NGarray[i] + "</span><button type='button' id=" + i + ">削除</button></li></div>";
             ListNGword.insertAdjacentHTML("beforeend", insHTML);
           }
         }
       })

     }else{
       console.log(result.key_NGarray.length + "else")
       var insHTML = "<div class='NGli'><li>追加されているNGワードはありません！</li></div>";
       ListNGword.insertAdjacentHTML("beforeend", insHTML);
     }
   })
 }

 var delNG_function = function(value){
   var temparray = new Array(0);
   var spanID = "lispan" + value.target.id;
   var spanElem = document.getElementById(spanID);

   chrome.storage.local.get(["key_NGarray"], function(result){
     temparray = result.key_NGarray;
     delete temparray[value.target.id];
     chrome.storage.local.set({key_NGarray: temparray});
     console.log(temparray)
   })

   deletedWord:{
     spanElem.classList.add("deletedWord");
   }
 }

 var allclear_function = function(){
   chrome.storage.local.remove(["key_NGarray"]);
   alert("すべて削除しました！\nAll removed!");
   window.close();
 }

 document.body.addEventListener("click", delNG_function);
 allClear.addEventListener("click", allclear_function);
