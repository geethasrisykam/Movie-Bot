var telbot = require('node-telegram-bot-api');
var token = '1052181143:AAFm4iAXOjm2I6YAlkArSmjPESE-Vu7LJWE';
var bot = new telbot(token,{polling:true});
var request=require('request');
bot.onText(/\/movie (.+)/,function(msg,match){
	var movie = match[1];
	var chatId=msg.chat.id;
	request(' http://www.omdbapi.com/?apikey=593ea2f4&t='+movie,function(error,response,body){
		if(!error && response.statusCode === 200){
			bot.sendMessage(chatId,'_Looking for _' + movie + '...' , {parse_mode:'Markdown'})
			.then(function(msg){
				var res = JSON.parse(body);
				//bot.sendMessage(chatId,'Result:\n Title: '+res.Title+'\n Year :'+res.Year+'\n Rated:'+res.Rated+'\n Released: '+res.Released);
				bot.sendPhoto(chatId, res.Poster,{caption:'Result:\n Title: '+res.Title+'\n Year :'+res.Year+'\n Rated:'+res.Rated+'\n Released: '+res.Released});
			}) 
			//bot.sendMessage(chatId ,'Result: \n'+ body);
		}
	});
});