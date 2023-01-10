async function main() {

    let resp = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=62af9a789bbf46528d455c4b1c5d3631')
    let resu = await resp.json()

    let {BNTX, DIS, GME, MSFT} = resu
    // let {GME, MSFT, DIS, BNTX} = mockData
    const stocks = [GME, MSFT, DIS, BNTX]

    stocks.forEach(s => s.values.reverse())

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: stocks[0].values.map(v => v.datetime),
          datasets: stocks.map(s => ({
            label: s.meta.symbol,
            data: s.values.map(v => parseFloat(v.high)),
            backgroundColor: getColor(s.meta.symbol),
            borderColor: getColor(s.meta.symbol)
          }))
        }
      });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(s => s.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(s => Math.max(...s.values.map(v => parseFloat(v.high)))),
                backgroundColor: ['rgba(61, 161, 61, 0.7)', 'rgba(209, 4, 25, 0.7)', 'rgba(18, 4, 209, 0.7)', 'rgba(166, 43, 158, 0.7)']
            }] 
        }
    })
}

const getColor = (s) => {
    switch (s) {
        case 'GME':
            return 'rgba(61, 161, 61, 0.7)'
        case 'MSFT':
            return 'rgba(209, 4, 25, 0.7)'
        case 'DIS':
            return 'rgba(18, 4, 209, 0.7)'
        case 'BNTX':
            return 'rgba(166, 43, 158, 0.7)'
    }
}

main()