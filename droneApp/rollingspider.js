/**
 * cylon-rolling-spider example
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var PubNub = require('pubnub');
require('events').EventEmitter.prototype._maxListeners = 100;

var pn = new PubNub({
    ssl           : true,
    publishKey   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribeKey : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
});


var RollingSpider = require("rolling-spider");
var rollingSpider = new RollingSpider();
var temporal = require('temporal');
// NEW CODE BELOW HERE


rollingSpider.connect(function () {
  rollingSpider.setup(function () {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();
  	console.log('Connected to drone', rollingSpider.name);


      pn.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("Waiting");
            }
        },
        message: function(message1) {
            console.log(JSON.stringify(message1));
            message1 = JSON.parse(JSON.stringify(message1));
            var steps = message1.message.steps;
            //console.log(message1.message.command);
            switch(message1.message.command)  {
    		        case "initiate":
        		      //code block
                  console.log("initiate");
                    rollingSpider.takeOff();
                    rollingSpider.flatTrim();
                break;
                case "takeOff":
                  //code block
                  //for (var i = 0; i < 5; i++) {
                    console.log('=================');
                    //console.log('loop number' + i);
                    console.log("take Off");
                    rollingSpider.takeOff();
                    rollingSpider.forward({step:0, speed: 0});

                    rollingSpider.hover();
                  //}
                break;
                case "forward":
                  //code block
                  console.log("foward");
                  console.log("Steps " +message1.message.steps );
                  console.log("Speed " +message1.message.speed );
                  rollingSpider.takeOff();
                  rollingSpider.forward({step:message1.message.steps, speed: message1.message.speed});
                  rollingSpider.flatTrim();
                break;
                case "back":
                  //code block
                  console.log("foward");
                  console.log("Steps " +message1.message.steps );
                  console.log("Speed " +message1.message.speed );
                  rollingSpider.takeOff();
                  rollingSpider.backward({step:message1.message.steps, speed: message1.message.speed});
                  rollingSpider.flatTrim();
                break;
                case "left":
                  //code block
                  console.log("foward");
                  console.log("Steps " +message1.message.steps );
                  console.log("Speed " +message1.message.speed );
                  rollingSpider.takeOff();
                  rollingSpider.tiltLeft({step:message1.message.steps, speed: message1.message.speed});
                  rollingSpider.flatTrim();
                break;
                case "right":
                  //code block
                  console.log("foward");
                  console.log("Steps " +message1.message.steps );
                  console.log("Speed " +message1.message.speed );
                  rollingSpider.takeOff();
                  rollingSpider.tiltRight({step:message1.message.steps, speed: message1.message.speed});
                  rollingSpider.flatTrim();
                break;
                case "north":
                  //code block
                  console.log("North");
                  console.log("Steps " +steps );
                  rollingSpider.takeOff();
                  rollingSpider.forward({step:steps});
                  rollingSpider.flatTrim();
                break;
                case "south":
                  //code block
                  console.log("South");
                  console.log("Steps " +steps );
                  rollingSpider.takeOff();
                  rollingSpider.backward({step:steps});
                  rollingSpider.flatTrim();
                break;
                case "west":
                  //code block
                  console.log("West");
                  console.log("Steps " +steps );
                  rollingSpider.takeOff();
                  rollingSpider.tiltLeft({step:steps});
                  rollingSpider.flatTrim();
                break;
                case "east":
                  //code block
                  console.log("East");
                  console.log("Steps " +steps );
                  rollingSpider.takeOff();
                  rollingSpider.tiltRight({step:steps});
                  rollingSpider.flatTrim();
                break;
                case "dance":
                  //code block
                  console.log("take Off");
                  rollingSpider.takeOff();
                  rollingSpider.forward({step:10, speed: 30});
                  rollingSpider.flatTrim();
                break;
                case "land":
                  //code block
                  console.log("landing now");
                  rollingSpider.land();
                break;
                default:
                  //default code block
            }
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pn.subscribe({
        channels: ['my_channel']
    });
});
});
