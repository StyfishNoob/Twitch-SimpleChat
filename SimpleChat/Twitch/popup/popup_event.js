 'use strict';

 var limit_function = function(){

   if(comment_limit.value < 0){
     comment_limit.value = 0;
   }

   if(comment_limit.value > 100000){
     comment_limit.value = 100000;
   }

   chrome.storage.local.set({key_comment_limit: comment_limit.value});
   chrome.storage.local.get(["key_comment_limit"], function(result){
     if(result.key_comment_limit == 0){
       limit_display.innerHTML = "<b>Unrestricted</b>";
     }else{
       limit_display.innerHTML = "Limit: " + result.key_comment_limit;
     }
   })
 }

 var onoff_function = function(){
   chrome.storage.local.set({key_switch_onoff: css_switch_onoff.checked});

   if(css_switch_onoff.checked == true){
     css_switch_name.disabled = false;
     css_switch_stripe.disabled = false;
   }

   if(css_switch_onoff.checked == false){
     css_switch_name.checked = false;
     css_switch_stripe.checked = false;
     css_switch_name.disabled = true;
     css_switch_stripe.disabled = true;
     chrome.storage.local.set({key_switch_name: false});
     chrome.storage.local.set({key_switch_stripe: false});
   }
 }

 var name_function = function(){
   chrome.storage.local.set({key_switch_name: css_switch_name.checked});
 }

 var stripe_function = function(){
   chrome.storage.local.set({key_switch_stripe: css_switch_stripe.checked});
 }

 var chatfilter_function = function(){
   chrome.storage.local.set({key_switch_chatfilter: css_switch_chatfilter.checked});
 }

 var addNGword_function = function(){
   if(NGword.value){
     addedNG.classList.remove("added-display");
     addedNG_error.classList.remove("added-error-display");

     chrome.storage.local.get(["key_NGarray"], function(result){
       WordCheck:{
         if(array_comp(result.key_NGarray, NGword.value) == true){
           console.log(array_comp(result.key_NGarray, NGword.value));
           addedNG_error.classList.add("added-error-display");
         }
       }

       NGword:{
         if(result.key_NGarray){
           let temparray;

           if(array_comp(result.key_NGarray, NGword.value) == false){
             temparray = result.key_NGarray;
             temparray.push(NGword.value);
             chrome.storage.local.set({key_NGarray: temparray});

             addedNG.classList.add("added-display");
           }
         }else{
           let temparray = new Array(0);
           temparray.push(NGword.value);
           chrome.storage.local.set({key_NGarray: temparray});

           addedNG.classList.add("added-display");
         }
       }

       clear:{
         NGword.value = "";
       }
     })
   }
 }

 var addNGuser_function = function(){
   if(NGuser.value){
     addedNG.classList.remove("added-display");
     addedNG_error.classList.remove("added-error-display");

     chrome.storage.local.get(["key_NGuser"], function(result){
       console.log(result.key_NGuser);
       WordCheck:{
         if(array_comp(result.key_NGuser, NGuser.value) == true){
           addedNG_error.classList.add("added-error-display");
         }
       }

       NGuser:{
         if(result.key_NGuser){
           let temparray;

           if(array_comp(result.key_NGuser, NGuser.value) == false){
             temparray = result.key_NGuser;
             temparray.push(NGuser.value);
             chrome.storage.local.set({key_NGuser: temparray});

             addedNG.classList.add("added-display");
           }
         }else{
           let temparray = new Array(0);
           temparray.push(NGuser.value);
           chrome.storage.local.set({key_NGuser: temparray});

           addedNG.classList.add("added-display");
         }
       }

       clear:{
         NGuser.value = "";
       }
     })
   }
 }

 var listNG_function = function(){
   window.open("/Twitch/popup/NG/NGList.html");
 }

 var array_comp = function(array, target){
   let returnValue = false;

   if(array){
     array.forEach(function(value){
       if(value === target){
         returnValue = true;
       }
     })
   }else{
     return returnValue;
   }
   return returnValue;
 }

 var clear = function(){
   chrome.storage.local.clear();
   return "clear!";
 }

 comment_limit.addEventListener("input", limit_function);
 comment_limit.addEventListener("keypress", limit_function);
 css_switch_onoff.addEventListener("click", onoff_function);
 css_switch_name.addEventListener("click", name_function);
 css_switch_stripe.addEventListener("click", stripe_function);
 css_switch_chatfilter.addEventListener("click",chatfilter_function);
 addNGword.addEventListener("click", addNGword_function);
 addNGuser.addEventListener("click", addNGuser_function);
 Listbutton.addEventListener("click", listNG_function);
