var body = document.querySelector('body');
var container = document.querySelector('.container');
var form = document.querySelector('form');
var input = document.querySelector('input');
var previousSearch = '';

function searchWikipedia(e) {
  e.preventDefault();
  var reqURL = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&search=' + input.value;
  var req = new XMLHttpRequest();
  req.open('GET', reqURL);
  req.responseType = 'json';
  if(previousSearch !== input.value) {
    req.send();
  }
  req.onload = function () {
    previousSearch = input.value;
    if(!input.value) {
      container.style.marginTop = '15rem';
    }
    var searchResults = req.response;
    var oldDivs = document.querySelectorAll('.searchResult');
    var noResultDiv = document.querySelector('.noResultFound');
    if (oldDivs.length) {
      oldDivs.forEach(function (el) {
        body.removeChild(el);
      });
    } else if(noResultDiv) {
      body.removeChild(noResultDiv);
    }
    if (searchResults[1].length) {
      container.style.marginTop = '5rem';
      searchResults[1].forEach(function (el, index) {
        var div = document.createElement('div');
        div.classList.add('searchResult');
        div.className += ' animated fadeInUp';
        var a = document.createElement('a');
        a.href = searchResults[3][index];
        a.target = '_blank';
        a.textContent = searchResults[1][index];
        div.appendChild(a);
        var p = document.createElement('p');
        p.textContent = searchResults[2][index];
        div.appendChild(p);
        document.body.appendChild(div);
      });
    } else {
      container.style.marginTop = '8rem';
      var outerDiv = document.createElement('div');
      outerDiv.classList.add('noResultFound');
      var p = document.createElement('p');
      p.textContent = 'Sorry, no result found for \'' + input.value + '\'';
      outerDiv.appendChild(p);
      var innerDiv = document.createElement('div');
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);
    }
  }
}

window.onload = function () {
  input.focus();
};

form.addEventListener('submit', searchWikipedia);
