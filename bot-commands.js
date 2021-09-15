export function play(){
    let musicPlay = msg.content.slice(6);
    if (ytdl.validateURL(musicPlay)) {
        servers.server.dispatcher = servers.server.connection.play(ytdl(musicPlay, config.YTDL)); //wait for the user to provide a link to play (only user on voice channel can trigger this action) 
        msg.channel.send('Tocando a música escolhida por ' + msg.author.username)
    } else {
        msg.channel.send('invalid link ' + msg.author.username);
    }
};