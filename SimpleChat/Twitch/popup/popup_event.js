 'use strict';

 var ng_array;

 var limit_function = function(){
   chrome.storage.local.set({key_comment_limit: comment_limit.value});
   chrome.storage.local.get(["key_comment_limit"], function(result){
     if(result.key_comment_limit == 0){
       limit_display.innerHTML = "制限なし";
     }else{
       limit_display.innerHTML = "制限" + result.key_comment_limit + "字";
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

 var darkmode_function = function(){
   chrome.storage.local.set({key_switch_darkmode: css_switch_darkmode.checked});
 }

 var addNG_function = function(){
   if(NGword.value){

     chrome.storage.local.get(["key_NGarray"], function(result){
       if(result.key_NGarray){
         ng_array = result.key_NGarray;
         ng_array.push(NGword.value);
         chrome.storage.local.set({key_NGarray: ng_array});
       }else{
         ng_array = new Array(0);
         ng_array.push(NGword.value);
         chrome.storage.local.set({key_NGarray: ng_array});
       }

       NGword.value = "";
     })
   }
 }

 var listNG_function = function(){
   window.open("/Twitch/popup/NG/NGList.html");
 }

 comment_limit.addEventListener("input", limit_function);
 css_switch_onoff.addEventListener("click", onoff_function);
 css_switch_name.addEventListener("click", name_function);
 css_switch_stripe.addEventListener("click", stripe_function);
 css_switch_darkmode.addEventListener("click", darkmode_function);
 addNGbutton.addEventListener("click", addNG_function);
 Listbutton.addEventListener("click", listNG_function);

 var clear = function(){
   chrome.storage.local.clear();
 }
