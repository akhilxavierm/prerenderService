'use strict';

self.addEventListener('message', function(e) {
  var templateList = e.data.list,
    xmlhttp,
    count = 0;

  function openRequest(i) {
    xmlhttp.open("GET", templateList[i], true);
    xmlhttp.send();
  }

  function recallIfNextValueExists() {
    if (templateList[count] !== undefined) {
      openRequest(count);
    }
  }

  if (templateList !== undefined) {
    if (new XMLHttpRequest()) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }



    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        self.postMessage({
          content: xmlhttp.responseText,
          templateId: templateList[count++]
        });

        recallIfNextValueExists();
      }
    };

    recallIfNextValueExists();
  }
}, false);
