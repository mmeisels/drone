/**
 * cylon-rolling-spider example
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var PubNub = require('pubnub');

var pn = new PubNub({
    ssl           : true,
    publishKey   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribeKey : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
});


      pn.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("Waiting");
            }
        },
        message: function(message1) {
            console.log(JSON.stringify(message1));
            message1 = JSON.parse(JSON.stringify(message1));
            console.log(message1.message.command);
        }
      });
      console.log("Subscribing..");
      pn.subscribe({
          channels: ['my_channel']
      });
