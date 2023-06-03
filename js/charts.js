google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  let data = google.visualization.arrayToDataTable([
    ["Element", "Vendas K", { role: "style" }],
    ["2020", 8.94, "white"],
    ["2021", 10.49, "white"],
    ["2022", 19.3, "white"],
    ["2023", 10.3, "white"],
    ["2023", 10.3, "white"],
    ["2023", 10.3, "white"],
    ["2023", 10.3, "white"],
    ["2023", 10.3, "white"],
  ]);

  // Set chart options
  let options = {
    title: "Volume de vendas 2022",
    width: 1000,
    height: 320,
    backgroundColor: { fill: "transparent" },
  };

  let chart = new google.visualization.ColumnChart(
    document.getElementById("barchart")
  );
  chart.draw(data, options);
}
