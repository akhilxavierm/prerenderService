var redis = require("redis");
var request = require('request')
var client = redis.createClient();
var urlCount = 0;

//request for to get all the urls which should be cached
module.exports = function() {
  request({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Content-Type': 'application/json'
    },

    uri: 'http://localhost:7000/',
    method: 'GET'
  }, function(error, response, body) {
    //console.log("response status--" + response.statusCode);
    if (!error && response.statusCode == 200) {
      var urls = JSON.parse(body).urls;
      console.log("urls length--" + urls.length);
      urlCount = 0;
      preCacheCall(urls);

    };
  });
}

//make calls to recived urls for to get cached
function preCacheCall(allUrls) {
  clearRedis(allUrls[urlCount]);
  request({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
    },

    uri: 'http://localhost:3000' + allUrls[urlCount],
    method: 'GET'
  }, function(error, response, body) {
    console.log("response status--" + response.statusCode);
    if (!error && response.statusCode == 200) {
      urlCount++;
      console.log("url conutn succes--" + (urlCount - 1));
      if (urlCount < allUrls.length) {
        preCacheCall(allUrls);
      }

    } else {
      console.log("url conutn error--" + urlCount);
      if (urlCount < allUrls.length) {
        preCacheCall(allUrls);
      }
    }
  });
}

//clearing cached snapshots from redis
function clearRedis(urlToClear) {
  client.del(urlToClear, function(err, reply) {
    console.log(reply + "---------" + urlToClear);
  });
}
