let chart;

async function loadGoldData() {
  const res = await fetch("/api/gold/year");
  if (!res.ok) throw new Error("Failed to load gold data");
  return res.json();
}

function buildChart(labels, prices) {
  const ctx = document.getElementById("goldChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Gold Rate",
        data: prices,
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          ticks: { maxTicksLimit: 12 }
        },
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

async function refresh() {
  const json = await loadGoldData();
  const labels = json.series.map(x => x.date);
  const prices = json.series.map(x => x.price);

  buildChart(labels, prices);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  document.getElementById("meta").textContent =
    `Unit: ${json.currency} ${json.unit} | Min: ${min.toFixed(2)} | Max: ${max.toFixed(2)}`;
}

document.getElementById("reloadBtn").addEventListener("click", () => {
  refresh().catch(err => alert(err.message));
});

refresh().catch(err => alert(err.message));