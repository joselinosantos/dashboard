const produtos = document.getElementById("numero-produtos");
const vendas = document.getElementById("quantidade-vendas");
const clientes = document.getElementById("clientes-ativos");

preencherContadores();
preencherTabela();

function preencherContadores() {
  Promise.all([
    storeapiGet("products/"),
    storeapiGet("carts/"),
    storeapiGet("users/"),
  ]).then(function (results) {
    produtos.innerHTML += results[0].data.length;
    vendas.innerHTML += results[1].data.length;
    clientes.innerHTML += results[2].data.length;
  });
}

async function preencherTabela() {
  const response = await storeapiGet("carts/");
  const tableData = response.data.slice(0, 2);

  tableData.forEach((cart) => {
    $(".pedidos-table").append(`<tr>
        <td>${cart.userId}</td>
        <td>${moment(cart.date).format("DD/MM/YYYY")}</td>
        <td>${cart.products}</td>
        <td>${cart.products.length}</td>
        </tr>`);
  });
}

function barchart() {}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await storeapiGet("products/");
  const categoriesArray = response.data;

  const dataArray = [];
  dataArray.push(["Categoria", "Quantidade"]);

  // Objeto para contar as ocorrências de cada categoria
  const categoryCount = {};

  // Contagem das categorias
  categoriesArray.forEach((cat) => {
    const category = cat.category;
    if (categoryCount[category]) {
      categoryCount[category]++;
    } else {
      categoryCount[category] = 1;
    }
  });

  // Exibição dos resultados
  for (const category in categoryCount) {
    dataArray.push([category, Number(categoryCount[category])]);
  }

  let data = google.visualization.arrayToDataTable(dataArray);

  let options = {
    title: "",
    // legend: 'none',
    width: 550,
    height: 230,
    pieHole: 0.4,
    chartArea: { left: 10, top: 10, width: "100%", height: "75%" },
    backgroundColor: { fill: "transparent" },
  };

  let chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );

  chart.draw(data, options);
}

function storeapiGet(param) {
  return axios.get(`https://fakestoreapi.com/${param}`);
}
