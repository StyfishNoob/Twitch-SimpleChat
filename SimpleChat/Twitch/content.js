 'use strict';

 var comment = document.querySelectorAll(".chat-line__message");
 var stylesheet;
 var stylesheets;
 var item_num;
 var onoff_toggle;
 var name_toggle;
 var stripe_toggle;

 window.onload = function(){
   onoff_toggle = 0;
   name_toggle = 0;
   stripe_toggle = 0;
 }

 setInterval(function(){
   comment = document.querySelectorAll(".text-fragment");
   stylesheet = document.styleSheets;
   item_num = stylesheet.length -1;
   stylesheets = document.styleSheets.item(item_num);

   if(stylesheets && stylesheet.length > 13){
     onoff_function();
     name_function();
     stripe_function();
   }

   chrome.storage.local.get(["key_comment_limit"], function(result){
     comment.forEach(function(value){
       if(value.outerText.length > result.key_comment_limit && result.key_comment_limit != 0){
         value.innerHTML = "#拡張機能により削除されました";
       }
     })
   });
 }, 100)

 var onoff_function = function(){
   chrome.storage.local.get(["key_switch_onoff"], function(result){

     if(result.key_switch_onoff == true && onoff_toggle == 0){
       onoff_toggle = 1;
       stylesheets.insertRule(".chat-line__username-container span{ display: none !important; }" , stylesheets.cssRules.length);
       stylesheets.insertRule('span[data-test-selector="chat-message-separator"]{ display: none !important; }', stylesheets.cssRules.length);
       stylesheets.insertRule(".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #f5f5f5; }", stylesheets.cssRules.length);
     }

     if(result.key_switch_onoff == false){
       onoff_toggle = 0;
       exist_ruledel('span[data-test-selector="chat-message-separator"]');
       exist_ruledel(".chat-scrollable-area__message-container > :nth-child(2n)");
       exist_ruledel(".chat-line__username-container span");
     }
   })
 }

 var name_function = function(){
   chrome.storage.local.get(["key_switch_name","key_switch_onoff"], function(result){

     if(result.key_switch_name == true && result.key_switch_onoff == true){
       name_toggle = 1;
       exist_ruledel(".chat-line__username-container span");
       exist_ruledel('span[data-test-selector="chat-message-separator"]');
     }

     if(result.key_switch_name == false && result.key_switch_onoff == true && name_toggle == 1){
       name_toggle = 0;
       stylesheets.insertRule(".chat-line__username-container span{ display: none !important; }" , stylesheets.cssRules.length);
       stylesheets.insertRule('span[data-test-selector="chat-message-separator"]{ display: none !important; }', stylesheets.cssRules.length);
     }

   })
 }

 var stripe_function = function(){
   chrome.storage.local.get(["key_switch_stripe","key_switch_onoff"], function(result){

     if(result.key_switch_stripe == true && result.key_switch_onoff == true){
       stripe_toggle = 1;
       exist_ruledel(".chat-scrollable-area__message-container > :nth-child(2n)");
     }

     if(result.key_switch_stripe == false && result.key_switch_onoff == true && stripe_toggle == 1){
       stripe_toggle = 0;
       stylesheets.insertRule(".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #f5f5f5; }", stylesheets.cssRules.length);
     }

   })
 }

 var exist_ruledel = function(arg){
   for(var i = 0; i < stylesheets.cssRules.length; i++){
     if(stylesheets.cssRules[i].selectorText == arg){
       stylesheets.deleteRule(i);
     }
   }
 }
