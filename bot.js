const Discord = require ("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const config = require ("./config.json");
const prefix = '!';
const servers = {
    'server': {
        connection: null,
        dispatcher: null
    }
}


client.on("ready", () => {
    console.log('Estou online!');
});

client.on("message", async (msg) => {

    //filters

    if (!msg.guild) return;

    if (!msg.content.startsWith(prefix)) return;


    //Music commands
    if (msg.content === prefix + "oi"){
        msg.channel.send ('olá '+ msg.author.username);
    }

    if (msg.content === prefix + "help"){
        msg.channel.send ('Sou o Makoto, posso tocar suas músicas (desde que você esteja em um canal de voz)'+
        ' \n \n!play: toca a música solicitada'+
        ' \n!pause: pausa a reprodução da música'+ 
        ' \n!leave: fará com que eu me disconecte do canal de voz');
        return;
      
    }

    if (msg.member.voice.channel){
        
        if (msg.content === prefix + 'join'){
            try{
                servers.server.connection = await msg.member.voice.channel.join(); //store the connection information (voice channel)
            msg.channel.send('Me juntei ao canal de voz ' + msg.channel.name)
            } 
            catch (err) {
                console.log('Erro ao entrar no canal solicitado');
                console.log(err);
            }
            

        }

        if (msg.content === prefix + 'leave'){  //this block is related to the "leave" function. Command "!leave" 
            msg.member.voice.channel.leave();
            servers.server.connection = null;
            servers.server.dispatcher = null;
            msg.channel.send('Até mais')

        }
    
        if (msg.content.startsWith(prefix + 'play')) { //this block is related to the "play" function. Command "!play+link"
            let musicPlay = msg.content.slice(6);
             if (ytdl.validateURL(musicPlay)) {
            servers.server.dispatcher = servers.server.connection.play(ytdl(musicPlay, config.YTDL)); //wait for the user to provide a link to play (only user on voice channel can trigger this action) 
            msg.channel.send('Tocando a música escolhida por ' + msg.author.username)
            } else {
                msg.channel.send('invalid link ' + msg.author.username);
            }
        }

    } else {
        (msg.member.voice.channel);{
        msg.channel.send('É necessário estar em um canal de voz!');
        return
        }

    }

    if (msg.content === prefix + 'pause') { //this block is related to the "pause" function. Command "!pause"
        servers.server.dispatcher.pause();
        msg.channel.send('Música pausada')
    }

    if (msg.content === prefix + 'resume') { //this block is related to the "resume" function. Command "!resume". **THIS FUNCTION IS CURRENTLY BROKEN**
        servers.server.dispatcher.resume();
        msg.channel.send("Resumindo música")

    }

});


   



client.login(config.token);