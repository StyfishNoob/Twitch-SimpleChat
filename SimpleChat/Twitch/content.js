 'use strict';

 var comment = document.querySelectorAll(".chat-line__message");
 var stylesheet;
 var stylesheets;
 var item_num;

 var onoff_toggle;
 var name_toggle;
 var stripe_toggle;

 const name_css = ".chat-line__username-container span";
 const separator_css = 'span[data-test-selector="chat-message-separator"]';
 const back_css = ".chat-scrollable-area__message-container > :nth-child(2n)";

 const name_cssrule = ".chat-line__username-container span{ display: none !important; }";
 const separator_cssrule = 'span[data-test-selector="chat-message-separator"]{ display: none !important; }';
 var back_cssrule;

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
     back_function();
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
 }, 1000)

 var onoff_function = function(){
   chrome.storage.local.get(["key_switch_onoff"], function(result){

     if(result.key_switch_onoff  == true){
       exist_css_insert(name_css,name_cssrule,false);
       exist_css_insert(separator_css,separator_cssrule,false);
       exist_css_insert(back_css,back_cssrule,false);
     }

     if(result.key_switch_onoff == false){
       exist_ruledel(separator_css);
       exist_ruledel(back_css);
       exist_ruledel(name_css);
     }
   })
 }

 var name_function = function(){
   chrome.storage.local.get(["key_switch_name","key_switch_onoff"], function(result){

     if(result.key_switch_name == true && result.key_switch_onoff == true){
       exist_ruledel(name_css);
       exist_ruledel(separator_css);
     }

     if(result.key_switch_name == false && result.key_switch_onoff == true){
       exist_css_insert(name_css,name_cssrule,false);
       exist_css_insert(separator_css,separator_cssrule,false);
     }

   })
 }

 var stripe_function = function(){
   chrome.storage.local.get(["key_switch_stripe","key_switch_onoff"], function(result){

     if(result.key_switch_stripe == true && result.key_switch_onoff == true){
       exist_ruledel(back_css);
     }

     if(result.key_switch_stripe == false && result.key_switch_onoff == true){
       exist_css_insert(back_css,back_cssrule,false);
     }

   })
 }

 var back_function = function(){
   chrome.storage.local.get(["key_switch_darkmode","key_switch_onoff","key_switch_stripe"], function(result){
     if(result.key_switch_darkmode == true){
       back_cssrule = ".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #232123 }";
     }

     if(result.key_switch_darkmode == false){
       back_cssrule = ".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #f5f5f5 }";
     }

     if(back_css != back_cssrule){
       exist_ruledel(back_css);
       stylesheets.insertRule("back_cssrule");
     }
   })
 }

 var exist_ruledel = function(value){
   for(var i = 0; i < stylesheets.cssRules.length; i++){
     if(stylesheets.cssRules[i].selectorText == value){
       stylesheets.deleteRule(i);
     }
   }
 }

 var exist_css_insert = function(css,cssrule,auth){
   if(check_css(css) == auth){
     stylesheets.insertRule(cssrule, stylesheets.cssRules.length);
   }
 }

 var check_css = function(value){
   var toggle = false;
   var length = stylesheets.cssRules.length -1 +1;

   for(var i = 0; i < length; i++){
     if(stylesheets.cssRules[i].selectorText == value){
       toggle = true;
     }
   }

   return toggle;
 }
