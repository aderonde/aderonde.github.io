var tracery = require('tracery-grammar')
var Twit = require('twit')
var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  
})
var grammarObj = {
	"S": ["tip! wear #item1.a# with an #item2.a#", "spice up #season# by pairing #makeup1# with #item#!", ""],
	"item": ["#item1#", "item2#"],
	"SHOWZ": []
}
var grammar = tracery.createGrammar(grammarObj)
function generate(){
	var t = grammar.flatten("#S#");
	T.post('statuses/update', { status: t }, function(err, data, response) {
  		console.log(t)
	})
}
setInterval(generate, 20000)