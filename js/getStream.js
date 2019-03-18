function channelID (embedF){
  var header = {
    headers:
    {"Client-ID" : "ahdjbay0nwfudw247x8jxx1eogqz7g"},
    method:"GET"};

  var topUserUrl = 'https://api.twitch.tv/helix/streams?first=1&game_id=33214&type=live';
  var channel = getUser(topUserUrl, header, getChannel);
  return channel;

  function getUser(url, params, callback){
    fetch(url, params)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            }
            // Examine the text in the response
            response.json().then(function(data) {
              var user_id = data.data[0].user_id;
              var topChannelUrl =  'https://api.twitch.tv/helix/users?id=' + user_id;
              callback(topChannelUrl, params, embedF);
            })
          }
        )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }

  function getChannel(url, params, callback){
    fetch(url, params)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            }
            // Examine the text in the response
            response.json().then(function(data) {
              var channel_id = data.data[0].display_name;
              console.log(channel_id);
              callback(channel_id);
              return channel_id;
            })
          }
        )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }
}