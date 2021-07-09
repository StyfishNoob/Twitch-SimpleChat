 'use strict';

 chrome.runtime.onInstalled.addListener(function(){
   chrome.storage.local.set({key_comment_limit: 0});
   chrome.storage.local.set({key_switch_onoff: true});
   chrome.storage.local.set({key_switch_name: false});
   chrome.storage.local.set({key_switch_stripe: false});
   chrome.storage.local.set({key_switch_chatfilter: true});
 })
