 'use strict';

 window.onload = function(){
   chrome.storage.local.get(["key_comment_limit","key_switch_onoff","key_switch_name","key_switch_stripe","key_switch_darkmode"], function(result){
     darkmode_span.innerHTML = "";
     comment_limit.value = result.key_comment_limit;
     css_switch_onoff.checked = result.key_switch_onoff;
     css_switch_name.checked = result.key_switch_name;
     css_switch_stripe.checked = result.key_switch_stripe;
     css_switch_darkmode.checked = result.key_switch_darkmode;


     if(css_switch_onoff.checked == false){
       css_switch_name.disabled = true;
       css_switch_stripe.disabled = true;
     }

     if(result.key_comment_limit == 0){
       limit_display.innerHTML = "制限なし";
     }else{
       limit_display.innerHTML = "制限" + result.key_comment_limit + "字";
     }

   })
 }
