function shuffle() {
  var chunkSize = parseInt(document.getElementById('chunkSize').value);
  var textIn = document.getElementById('textIn').value;
  var poemDiv = document.getElementById('poemDiv');
  var poemPlace = document.getElementById('poemPlace');
  var trimmed = textIn.replace('  ', ' ')
                       .trim();

  var chunked = chunkWords(chunkSize, trimmed);
  var shuffled = shuffler(chunked);
  searchFor(shuffled, chunkSize, append);
}

function stanzize(text) {
  var textSplit = text.replace('  ', ' ')
                      .trim()
                      .split(' ');

  for (i = 0; i < textSplit.length; i++) {
    if (Math.random() < .15) {
      textSplit[i] = '<br>' + textSplit[i];
        if (Math.random() < .2) {
        textSplit[i] = '<br>' + textSplit[i]
        }
      }
    }
  var stanzized = textSplit.join(' ');
  return stanzized;
}

function chunkWords(perchunk, textToChunk){
  var textWords = textToChunk.split(" ");
  var numchunks = Math.ceil(textWords.length/perchunk);
  var chunks = [];

  for (i = 0; i < numchunks; i ++){
    var preChunk = textWords.slice((i*perchunk), (i * perchunk) + perchunk)
                            .join(' ');

    chunks[i] = preChunk.replace(',', '')
                       .trim()
                       + " ";
  }
  return chunks;
}

function shuffler(array){
 var m = array.length, t, q;
  while (m) {
      // Pick a remaining element…
      q = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[q];
      array[q] = t;
    }
  return array;
}

function searchFor(query, number, callback) {
  var snippet = '';
  for (t = 0; t < query.length; t++) {
    var cleanQ = query[t].replace(/(\r\n|\n|\r)/gm," ")
                         .replace('?','')
                         .replace('.','')
                         .replace(/\s/g,"+");
    var url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=1&q=" + cleanQ + "&safeSearch=false";
    var cHeaders = new Headers({
      "X-RapidAPI-Key": "4HyNtWOP0vmshy4Xcr9E6ECzk15ip1lgVLdjsnPKFR3o5Y8ZlQ"
    });
    var cInit = { method: 'GET',
                  headers: cHeaders };

    var cRequest = new Request(url, cInit);
    fetch(cRequest)
      .then(handleErrors)
      .then(function(response) {
        var data = response.json();
        console.log(data);
        var description = data.value[0].description;
        var preSnip = description.split(' ')
                                   .slice(0, number)
                                   .join(' ')
                                   .replace(/<[^>]*>/g, '')
                                   .trim();
        snippet += preSnip + ' ';
        callback(snippet);
        searchImg(preSnip);
      });
    }
  }

function searchImg(query) {
  var poemDiv = document.getElementById('poemDiv');
  var cleanQ = query.replace(/(\r\n|\n|\r)/gm," ")
                       .replace('?','')
                       .replace('.','')
                       .replace(/\s/g,"+");
  var url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=true&pageNumber=1&pageSize=1&q=" + cleanQ + "&safeSearch=false";
  var iHeaders = new Headers({
    "X-RapidAPI-Key": "4HyNtWOP0vmshy4Xcr9E6ECzk15ip1lgVLdjsnPKFR3o5Y8ZlQ"
  });
  var iInit = { method: 'GET',
                headers: iHeaders };
  var iRequest = new Request(url, iInit);

  fetch(cRequest)
    .then(handleErrors)
    .then(function(response) {
      var data = response.json();
      var imgURL = data.value[0].url;
      insert(imgURL);
    });
}

function append(textArray){
  var poemPlace = document.getElementById('poemPlace');
  poemPlace.innerHTML = stanzize(textArray);
}

function insert(url){
  var img = document.createElement('img');
  img.src = url;
  img.style.height = (Math.floor(Math.random()*140)) + 40 + 'px';
  img.style.width = (Math.floor(Math.random()*140)) + 40 + 'px';
  img.style.position = 'absolute';
  img.style.top = (Math.floor(Math.random() * 550)) +'px';
  img.style.left = (Math.floor(Math.random() * 600)) +'px';
  img.style.zIndex = '-2';

  poemDiv.appendChild(img);
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(response.statusText);
    }
    return response;
}
