

d3.json("./data.json", function(err, data) {
  if(err) alert(err);

  const nestByCountry = d3.nest()
    .key(d => d.Counterparty)

  const formatted = nestByCountry.entries(data.TradeInfos);

  console.log(toGraph(data));

  vis(formatted);
});

function toGraph(data) {
  const trades = data.TradeInfos;

  const nodes = {};
  const links = [];

  for(const t of trades) {
    assign(nodes, t.Party);
    assign(nodes, t.Counterparty);
  }

  for(const t of trades) {
    links.push({
      source: nodes[t.Party],
      target: nodes[t.Counterparty],
    })
  }

  return { nodes, links };

  function assign(m, k) {
    m[k] = m[k] || { name: k };
  }
}

function vis(data) {

  

  const trades = d3.select("svg")
    .selectAll(".tradeGroup")
    .data(data, (d) => d.key)

  const colorScale = d3.scale.linear()
    .range(["orange", "red"])
    .domain([0, data.length])
    .interpolate(d3.interpolateHsl)

  const perRow = 10;

  const tradesEnter = trades.enter() 
    .append("g")
    .attr("transform", (d,i) => {
      const x = (i % perRow) * 100 + 50;
      const y = Math.floor(i / perRow) * 100 + 50;

      return `translate(${x},${y})`;
    })

  tradesEnter.append("circle")
    .attr("r", (d) => d.values.length / 3)
    .attr("fill", (d,i) => colorScale(i))

  tradesEnter.append("text")
    .style("text-anchor", "middle")
    .text(d => d.key)

  tradesEnter.append("text")
    .style("text-anchor", "middle")
    .attr("dy", 18)
    .text(d => d.values.length)
}
