 'use strict';

 let comment = document.getElementsByClassName("text-fragment");
 let username = document.getElementsByClassName("chat-author__display-name");
 let stylesheet;
 let stylesheets;
 let item_num;

 const name_css = ".chat-line__username-container span";
 const separator_css = 'span[data-test-selector="chat-message-separator"]';
 const back_css = ".chat-scrollable-area__message-container > :nth-child(2n)";

 const name_cssrule = ".chat-line__username-container span{ display: none !important; }";
 const separator_cssrule = 'span[data-test-selector="chat-message-separator"]{ display: none !important; }';
 let back_cssrule;

 setInterval(function(){
   let commentText;

   //最新のコメ情報を取得するため
   comment = document.getElementsByClassName("text-fragment");
   username = document.getElementsByClassName("chat-author__display-name");

   chrome.storage.local.get(["key_comment_limit","key_NGarray"], function(result){
     for(let i = comment.length -1; i >= 0; i--){
       commentText = comment[i].innerHTML;

       if(commentText.length > result.key_comment_limit && result.key_comment_limit != 0){
         comment[i].remove();
       }

       if(result.key_NGarray){
         result.key_NGarray.forEach(function(ngword){
           let indexof = commentText.indexOf(ngword);

           if(indexof != -1){
             comment[i].remove();
           }
         })
       }
     }
   });
 }, 500)

 setInterval(function(){
   stylesheet = document.styleSheets;
   item_num = stylesheet.length -1;
   stylesheets = document.styleSheets.item(item_num);

   if(stylesheets){
     back_function();
     onoff_function();
     name_function();
     stripe_function();
   }
 }, 1000)

 var onoff_function = function(){
   chrome.storage.local.get(["key_switch_onoff","key_switch_name","key_switch_stripe"], function(result){

     if(result.key_switch_onoff  == true && result.key_switch_onoff == false){
       exist_css_insert(name_css,name_cssrule,false);
       exist_css_insert(separator_css,separator_cssrule,false);
     }

     if(result.key_switch_onoff  == true && result.key_switch_stripe == false){
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

     if(check_css(back_css) == true){ //途中でダークモードを切り替えた場合に必要
       exist_ruledel(back_css);
       stylesheets.insertRule(back_cssrule, stylesheets.cssRules.length);
     }
   })
 }

 var exist_ruledel = function(value){
   let rulelength = stylesheets.cssRules.length -1;
   for(let i = rulelength; i > 0; i--){
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
   let toggle = false;
   let length = stylesheets.cssRules.length -1;

   for(let i = 0; i < length; i++){
     if(stylesheets.cssRules[i].selectorText == value){
       toggle = true;
     }
   }

   return toggle;
 }
