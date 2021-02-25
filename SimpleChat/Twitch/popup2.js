 'use strict';

 var switch_onoff  = document.getElementById("css_switch_onoff");
 var switch_name   = document.getElementById("css_switch_name");
 var switch_stripe = document.getElementById("css_switch_stripe");
 var comment_limit = document.getElementById("comment_limit");
 var limit_display = document.getElementById("limit_display");

 var showhide_onoff = document.getElementById("showhide_onoff");
 var showhide_name = document.getElementById("showhide_name");
 var showhide_stripe = document.getElementById("showhide_stripe");

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
   chrome.storage.local.set({key_switch_onoff: switch_onoff.checked});

   if(switch_onoff.checked == true){
     switch_name.disabled = false;
     switch_stripe.disabled = false;
   }

   if(switch_onoff.checked == false){
     switch_name.checked = false;
     switch_stripe.checked = false;
     switch_name.disabled = true;
     switch_stripe.disabled = true;
     chrome.storage.local.set({key_switch_name: false});
     chrome.storage.local.set({key_switch_stripe: false});
   }
 }

 var name_function = function(){
   chrome.storage.local.set({key_switch_name: switch_name.checked});
 }

 var stripe_function= function(){
   chrome.storage.local.set({key_switch_stripe: switch_stripe.checked});
 }

 comment_limit.addEventListener("input", limit_function);
 switch_onoff.addEventListener("click", onoff_function);
 switch_name.addEventListener("click", name_function);
 switch_stripe.addEventListener("click", stripe_function);
