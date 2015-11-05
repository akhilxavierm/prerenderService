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
  for (var i = 0; i < 5; i++) {
    urlCount = i;
    singlePreCacheCall(urlCount, allUrls);
  }

}

function singlePreCacheCall(count, allUrls) {
  console.log("count-----" + count);
  console.log("url_count-" + urlCount);
  clearRedis(allUrls[count]);
  request({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
    },

    uri: 'http://localhost:3000' + allUrls[count],
    method: 'GET'
  }, function(error, response, body) {
    /* console.log(": " + body.length + " characters, " +
       Buffer.byteLength(body, 'utf8') + " bytes");
     console.log("response status--" + response.statusCode);*/
    if (!error && response.statusCode == 200) {
      console.log("success count--" + count);
      console.log("success url_count--" + urlCount);
      urlCount++;
      if (urlCount < allUrls.length) {
        singlePreCacheCall(urlCount, allUrls);
      } else {
        urlCount--;
      }

    } else {
      console.log("error count--" + count);
      console.log("error url_count--" + urlCount);
      singlePreCacheCall(count, allUrls);
    }
  });
}

//clearing cached snapshots from redis
function clearRedis(urlToClear) {
  client.del(urlToClear, function(err, reply) {
    //console.log(reply + "---------" + urlToClear);
  });
}
