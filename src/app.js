var View = require('./view');

var dataAPI = require('./api');

var appEl = document.querySelector('#app');

dataAPI.getData()
  .then(function(data) {

    data.forEach(function(d) {
      var el = document.createElement('div');
      el.classList.add('widget')
      appEl.appendChild(el);
      var view = new View(el, d);

      view.render();
    })


  })


