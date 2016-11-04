var PubNub = require('pubnub');

var pn = new PubNub({
    ssl           : true,
    publishKey   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribeKey : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
});

//var five = require("johnny-five");
//ar board = new five.Board();

//board.on("ready", function() {
  // Create an Led on pin 13
  //var led = new five.Led(13);
  // Blink every half second
  //led.blink(500); 
  
//  led = new five.Led(5);
  
  //led.strobe( 1000 );
  //this.repl.inject({
  //  led: led
  //});
  //console.log("You can interact with the bargraph via the variable 'led'");
  //console.log("e.g. led.stop();\n Hit control-d to exit.\n >> ");
 

      pn.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("Waiting");
            }
        },
        message: function(message) {
            console.log("New Message!!", message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })      
    console.log("Subscribing..");
    pn.subscribe({
        channels: ['my_channel'] 
    });
//});
