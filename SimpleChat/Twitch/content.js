 'use strict';

 let chatline;
 let cl_name;
 let cl_comment;
 let comment;
 let theme;

 let stylesheet;
 let stylesheets;
 let item_num;

 const name_css = ".chat-line__username-container span";
 const separator_css = 'span[data-test-selector="chat-message-separator"]';
 const back_css = ".chat-scrollable-area__message-container > :nth-child(2n)";


 const name_cssrule = ".chat-line__username-container span{ display: none !important; }";
 const separator_cssrule = 'span[data-test-selector="chat-message-separator"]{ display: none !important; }';
 let back_cssrule;

 window.onload = function(){
   setInterval(function(){

     //最新コメ情報を取得
     comment = document.getElementsByClassName("text-fragment");
     chatline = document.getElementsByClassName("chat-line__message");
     theme = document.getElementsByClassName("InjectLayout-sc-588ddc-0 chat-room jJFGJx")[0].getAttribute("data-a-target");

     chrome.storage.local.get(["key_comment_limit","key_NGarray","key_NGuser","key_switch_chatfilter"], function(result){
       if(result.key_switch_chatfilter == true){
         for(let i = 0; i < comment.length; i++){

           if(comment[i].innerHTML.length > result.key_comment_limit && result.key_comment_limit != 0){ //文字数オーバー
             if(!comment[i].children[0]){ //BetterTTV対策
               chatline[i].style.display = "none";
             }
           }

           if(result.key_NGarray){ //NGワード
             result.key_NGarray.forEach(function(value){
               if(comment[i].innerHTML.indexOf(value) != -1 && comment[i].length != 0){
                 chatline[i].style.display = "none";
               }
             })
           }
         }

         for(let i = chatline.length; i >= 0; i--){
           if(chatline[i]){
             if(chatline[i].children[0].children[2]){
               cl_comment = chatline[i].children[0].children[1].children[0].children[0].children[2].children[0];
               cl_name = chatline[i].children[0].children[1].children[0].children[0].children[0].children[1].children[0].children[0];
             }

             if(result.key_NGuser && cl_comment.length != 0){ //NGユーザー
               result.key_NGuser.forEach(function(value){
                 if(cl_name.textContent == value){ //完全一致
                   chatline[i].style.display = "none";
                 }
               })
             }
           }
         }
       }
     });
   }, 100)
 }


 setInterval(function(){
   stylesheet = document.styleSheets;
   item_num = stylesheet.length -1;
   stylesheets = document.styleSheets.item(item_num);

   if(stylesheets){
     back_function();
     onoff_function();
     name_function();
   }
 }, 500)

 var onoff_function = function(){
   chrome.storage.local.get(["key_switch_onoff","key_switch_name"], function(result){

     if(result.key_switch_onoff  == true && result.key_switch_onoff == false){
       exist_css_insert(name_css,name_cssrule,false);
       exist_css_insert(separator_css,separator_cssrule,false);
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

 var back_function = function(){
   chrome.storage.local.get(["key_switch_onoff","key_switch_stripe"], function(result){

     if(result.key_switch_onoff == true && result.key_switch_stripe == false){

       if(theme == "chat-theme-dark"){
         back_cssrule = ".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #232123 }";
         exist_css_insert(back_css,back_cssrule,false);
       }

       if(theme == "chat-theme-light"){
         back_cssrule = ".chat-scrollable-area__message-container > :nth-child(2n){ background-color: #f5f5f5 }";
         exist_css_insert(back_css,back_cssrule,false);
       }

       if(check_css(back_css) == true){ //途中でダークモードを切り替えた場合に必要
         exist_ruledel(back_css);
         stylesheets.insertRule(back_cssrule, stylesheets.cssRules.length);
       }
     }

     if(result.key_switch_stripe == true){
       exist_ruledel(back_css);
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
