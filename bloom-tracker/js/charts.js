/* =====================================================
   BLOOM — Chart Helpers (Chart.js wrappers, neomorphism-styled)
   ===================================================== */

const ChartTheme = {
  palette: ['#7C6BA0', '#A08CC8', '#C8A8D8', '#E8A87C', '#7CB8E8', '#7CE8A8', '#E87CA8', '#E8DC7C', '#B87CE8', '#A8A8A8'],

  textColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#7A6E90';
  },
  gridColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(124,107,160,0.1)';
  },
  fontFamily: "'Inter', sans-serif"
};

function makePieChart(ctx, labels, data, colors) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors || ChartTheme.palette,
        borderWidth: 3,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--surface').trim() || '#EDEAF5',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: ChartTheme.textColor(),
            font: { family: ChartTheme.fontFamily, size: 11 },
            padding: 14,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: (c) => `${c.label}: ${Fmt.currency(c.raw)}`
          }
        }
      }
    }
  });
}

function makeBarChart(ctx, labels, datasets) {
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: datasets.length > 1,
          position: 'bottom',
          labels: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 }, usePointStyle: true, pointStyle: 'circle' }
        },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${Fmt.currency(c.raw)}` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 } } },
        y: { grid: { color: ChartTheme.gridColor() }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 }, callback: (v) => '₹' + v } }
      }
    }
  });
}

function makeLineChart(ctx, labels, datasets) {
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 }, usePointStyle: true, pointStyle: 'circle' } },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${Fmt.currency(c.raw)}` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 } } },
        y: { grid: { color: ChartTheme.gridColor() }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 }, callback: (v) => '₹' + v } }
      },
      elements: { line: { tension: 0.35 }, point: { radius: 3, hoverRadius: 6 } }
    }
  });
}

function makeHorizontalBar(ctx, labels, data, colors) {
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: colors || ChartTheme.palette, borderRadius: 8, barThickness: 18 }] },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => Fmt.currency(c.raw) } } },
      scales: {
        x: { grid: { color: ChartTheme.gridColor() }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 }, callback: (v) => '₹' + v } },
        y: { grid: { display: false }, ticks: { color: ChartTheme.textColor(), font: { family: ChartTheme.fontFamily, size: 11 } } }
      }
    }
  });
}
