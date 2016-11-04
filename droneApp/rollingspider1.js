/**
 * cylon-rolling-spider example
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var PubNub = require('pubnub');
var Player = require('player');
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
    rollingSpider.startPing();
  	console.log('Connected to rollingSpider', rollingSpider.name);

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
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      console.log('=================');
                      //console.log('loop number' + i);
                      console.log("take Off");
                      rollingSpider.takeOff();
                      rollingSpider.forward({step:0, speed: 0});
                      rollingSpider.hover();
                    }
                  }]);
                break;
                case "forward":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      console.log("foward");
                      console.log("Steps " +message1.message.steps );
                      console.log("Speed " +message1.message.speed );
                      rollingSpider.takeOff();
                      rollingSpider.forward({step:message1.message.steps, speed: message1.message.speed});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "back":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      //code block
                      console.log("Back");
                      console.log("Steps " +message1.message.steps );
                      console.log("Speed " +message1.message.speed );
                      rollingSpider.takeOff();
                      rollingSpider.backward({step:message1.message.steps, speed: message1.message.speed});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "left":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      //code block
                      console.log("Left");
                      console.log("Steps " +message1.message.steps );
                      console.log("Speed " +message1.message.speed );
                      rollingSpider.takeOff();
                      rollingSpider.tiltLeft({step:message1.message.steps, speed: message1.message.speed});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "right":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      //code block
                      console.log("Right");
                      console.log("Steps " +message1.message.steps );
                      console.log("Speed " +message1.message.speed );
                      rollingSpider.takeOff();
                      rollingSpider.tiltRight({step:message1.message.steps, speed: message1.message.speed});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "north":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      console.log("North");
                      console.log("Steps " +steps );
                      rollingSpider.takeOff();
                      rollingSpider.forward({step:steps});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "south":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      console.log("South");
                      console.log("Steps " +steps );
                      rollingSpider.takeOff();
                      rollingSpider.backward({step:steps});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "west":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      //code block
                      console.log("West");
                      console.log("Steps " +steps );
                      rollingSpider.takeOff();
                      rollingSpider.tiltLeft({step:steps});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "east":
                  temporal.queue([
                  {
                    delay: 5000,
                    task: function () {
                      //code block
                      console.log("east");
                      console.log("Steps " +steps );
                      rollingSpider.takeOff();
                      rollingSpider.tiltLeft({step:steps});
                      rollingSpider.flatTrim();
                    }
                  }]);
                break;
                case "dance":
                  var player = new Player(['drone.mp3']);
                  // play again
                  player.play();
                  //
                  // // play the next song, if any
                  // player.next();
                  // // add another song to playlist
                  // player.add('http://someurl.com/anothersong.mp3');
                  // list songs in playlist
                  player.on('playing',function(item){
                    console.log('im playing... src:' + item);
                  });
                  // event: on playend
                  player.on('playend',function(item){
                    // return a playend item
                    console.log('src:' + item + ' play done, switching to next one ...');
                  });
                  // event: on error
                  player.on('error', function(err){
                    // when error occurs
                    console.log(err);
                  });
                  temporal.queue([
                    {
                      delay: 0,
                      task: function () {
                        rollingSpider.takeOff();
                        rollingSpider.flatTrim();
                        rollingSpider.startPing();
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.forward({ steps: 10 });
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.backward({ steps: 10 });
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        console.log("turning Back and Right");
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.forward({ steps: 10 });
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.forward({ steps: 10 });
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.backward({ steps: 10 });
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        console.log("turning Back and Right");
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.forward({ steps: 10 });
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.backward({ steps: 10 });
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        console.log("turning Back and Right");
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        //rollingSpider.up({steps: 10});
                        //rollingSpider.down({steps: 10});
                        //rollingSpider.up({steps: 10});
                        console.log("turning Left and Up");
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        //rollingSpider.up({steps: 10});
                        //rollingSpider.down({steps: 10});
                        //rollingSpider.up({steps: 10});
                        console.log("turning Left and Up");
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 5000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        console.log("turning Right and FWD");
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.frontFlip();
                        console.log("Front flip");
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.up({steps: 10});
                        rollingSpider.down({steps: 10});
                        rollingSpider.up({steps: 10});
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        //rollingSpider.up({steps: 10});
                        //rollingSpider.down({steps: 10});
                        //rollingSpider.up({steps: 10});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.backFlip();
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        // rollingSpider.up({steps: 10});
                        // rollingSpider.down({steps: 10});
                        // rollingSpider.up({steps: 10});
                      }
                    },
                    {
                      delay: 2000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        // rollingSpider.up({steps: 10});
                        // rollingSpider.down({steps: 10});
                        // rollingSpider.up({steps: 10});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.frontFlip();
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.frontFlip();
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.frontFlip();
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                        rollingSpider.turnRight({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                        rollingSpider.turnLeft({speed: 100});
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        rollingSpider.backFlip();
                      }
                    },
                    {
                      delay: 1000,
                      task: function() {
                        player.stop();
                        rollingSpider.backFlip();
                        rollingSpider.land();
                        console.log("Landing");
                        rollingSpider.land();
                      }
                    }
                  ]);
                break;
                case "dance1":
                  temporal.queue([
                    {
                      delay: 0,
                      task: function () {
                        rollingSpider.flatTrim();
                        rollingSpider.startPing();
                        rollingSpider.takeOff();
                      }
                    },
                    {
                      delay: 3000,
                      task: function () {
                        rollingSpider.up({speed:100,steps:10});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.down({speed:100,steps:10});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.up({speed:100,steps:10});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.down({speed:100,steps:10});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.up({speed:100,steps:20});
                        rollingSpider.forward({speed:100,steps:20});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.frontFlip();
                        rollingSpider.flatTrim();
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.down({speed:100,steps:15});
                        rollingSpider.flatTrim();
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.tiltRight();
                        rollingSpider.up({speed:90,steps:8});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.down({speed:90,steps:8});
                        rollingSpider.flatTrim();
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.tiltLeft();
                        rollingSpider.up({speed:80,steps:6});
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.down({speed:80,steps:6});
                        rollingSpider.flatTrim();
                      }
                    },
                    {
                      delay: 2500,
                      task: function () {
                        rollingSpider.land();
                      }
                    }]);
                break;
                case "dance-not so good":
                  var STEPS = 0.2;
                  var SPEED = 0.2;
                  temporal.queue([
                  {
                    delay: 0,
                    task: function () {
                      rollingSpider.flatTrim();
                      rollingSpider.startPing();
                      rollingSpider.takeOff();
                    }
                  },
                  {
                    delay: 3000,
                    task: function () {
                      //3 seconds
                      //potentially change speedto account for time before drop
                      // 23 seconds until drop from this point
                      rollingSpider.up({steps: STEPS * 40, speed: SPEED * 5});
                    }
                  },
                  {
                    delay: 5000,
                    task: function() {
                      //5 seconds
                      rollingSpider.forward({steps: STEPS * 25});
                    }
                  },
                  {
                    delay: 4500,
                    task: function() {
                      //9.5 seconds
                      rollingSpider.backward({steps: STEPS * 10});
                    }
                  },
                  {
                    delay: 3500,
                    task: function() {
                      //13 seconds
                      rollingSpider.left({steps: STEPS * 5});
                    }
                  },
                  {
                    delay: 4000,
                    task: function() {
                      //17 seconds
                      rollingSpider.right({steps: STEPS * 10});
                    }
                  },
                  {
                    delay: 3000,
                    task: function() {
                      //20 seconds
                      rollingSpider.turnRight({steps: STEPS * 50, speed: SPEED * 35});
                    }
                  },
                  {
                    delay: 3000,
                    task: function() {
                      //23 seconds
                      rollingSpider.tiltRight();
                    }
                  },
                  {
                    delay: 5000,
                    task: function() {
                      // 28 seconds
                      rollingSpider.tiltLeft();
                    }
                  },
                  {
                    delay: 3000,
                    task: function() {
                      // 31 seconds
                      rollingSpider.forward({speed: SPEED * 35, steps: STEPS * 50});
                    }
                  },
                  {
                    delay: 2000,
                    task: function() {
                      //38 seconds
                      rollingSpider.turnLeft({steps: STEPS * 50, speed: SPEED * 50});
                    }
                  },
                  {
                    delay: 7000,
                    task: function() {
                      //45 seconds
                      rollingSpider.land();
                    }
                  }]);
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
