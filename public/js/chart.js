const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {});
const initial = () => {
  let values = [];
  let labels = [];

  updateChart(120);

  // fetch('/api/chart/1000')
  //   .then(json => {
  //     json.json().then(json => {
  //       json.values.map(value => {
  //         values.push(value.y);
  //       });
  //       json.values.map(value => {
  //         var date = new Date(value.x * 1000);
  //         var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //         labels.push(weekday[date.getDay()]);
  //       });

  //       renderChart(labels, values);
  //     });
  //   })
  //   .catch(err => {
  //     console.log(
  //       'Error fetching data from /api/charts, error message: ' + err.message
  //     );
  //   });
};

const renderChart = (labels, data) => {
  removeData(myChart);
  myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Price',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    defaults: {
      global: {
        animation: {
          duration: 20000
        }
      }
    }
  });
};

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });
  chart.update();
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  chart.update();
}

const updateChart = (e, chart) => {
  let updatedValues = [];
  let updatedLabels = [];

  fetch(`/api/chart/${e}`).then(json => {
    json.json().then(json => {
      json.values.map(value => {
        updatedValues.push(value.y);
      });
      json.values.map(value => {
        var date = new Date(value.x * 1000);
        var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        updatedLabels.push(weekday[date.getDay()]);
      });
      renderChart(updatedLabels, updatedValues);
    });
  });
};
