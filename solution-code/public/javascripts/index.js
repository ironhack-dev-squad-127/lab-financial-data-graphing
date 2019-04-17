console.log('This is JS on the client side')

var ctx = document.getElementById('myChart').getContext('2d')

const api = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/'
})

function getBitcoinDataAndDrawGraph(start, end) {
  // axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  api.get('close.json', {
    params: {
      start: start,
      end: end
    }
  })
    .then(response => {
      console.log("TCL", response.data.bpi)

      // // Solution 1 to get the dates
      // let dates = []
      // for (const key in response.data.bpi) {
      //   dates.push(key)
      // }

      // Solution 2 to get the dates
      let dates = Object.keys(response.data.bpi)
      console.log("TCL: dates", dates)

      let values = Object.values(response.data.bpi)
      console.log("TCL: values", values)

      drawGraph(dates, values)
    })
}

function drawGraph(labels, values) {
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Bitcoin Price Index',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    // options: {
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             }
    //         }]
    //     }
    // }
  });
}

getBitcoinDataAndDrawGraph('2019-01-01', '2019-04-01')

// Select the input dates ('from' and 'to')
let $from = document.querySelector('input[name="from"]') 
let $to = document.querySelector('input[name="to"]')

$from.onchange = function() {
  getBitcoinDataAndDrawGraph($from.value, $to.value)
}
$to.onchange = function() {
  getBitcoinDataAndDrawGraph($from.value, $to.value)
}
