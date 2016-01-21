module.exports = {

  getData: function() {
    // yes sir, i can async
    return new Promise(function(resolve, reject) {

      setTimeout(function() {
        resolve([
          {
            title: 'Revenue',
            unit: '€',
            tabletColor: 'rgb(79, 208, 37)',
            phoneColor: 'rgb(15, 89, 0)',
            data: {
              phoneAmount: 8e4,
              tabletAmount: 12e4,
            },
          },
          {
            title: 'Impressions',
            unit: '',
            tabletColor: 'rgb(24, 197, 228)',
            phoneColor: 'rgb(9, 63, 77)',
            data: {
              phoneAmount: 2e7,
              tabletAmount: 3e7,
            },
          },
          {
            title: 'Visits',
            unit: '',
            tabletColor: 'rgb(247, 197, 13)',
            phoneColor: 'rgb(205, 68, 16)',
            data: {
              phoneAmount: 48e7,
              tabletAmount: 12e7,
            },
          },
        ])

      }, 1000);

    });

  }

}
