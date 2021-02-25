 'use strict';

 var switch_onoff  = document.getElementById("css_switch_onoff");
 var switch_name   = document.getElementById("css_switch_name");
 var switch_stripe = document.getElementById("css_switch_stripe");
 var comment_limit = document.getElementById("comment_limit");
 var limit_display = document.getElementById("limit_display");

 window.onload = function(){
   chrome.storage.local.get(["key_comment_limit","key_switch_onoff","key_switch_name","key_switch_stripe"], function(result){
     comment_limit.value = result.key_comment_limit;
     switch_onoff.checked = result.key_switch_onoff;
     switch_name.checked = result.key_switch_name;
     switch_stripe.checked = result.key_switch_stripe;

     if(switch_onoff.checked == false){
       switch_name.disabled = true;
       switch_stripe.disabled = true;
     }

     if(result.key_comment_limit == 0){
       limit_display.innerHTML = "制限なし";
     }else{
       limit_display.innerHTML = "制限" + result.key_comment_limit + "字";
     }

   })
 }

 var clear = function(){
   chrome.storage.local.remove(["key_comment_limit","key_switch_onoff","key_switch_name","key_switch_stripe","key_switch_onoff_toggle","key_switch_name_toggle","key_switch_stripe_toggle"]);
 }
