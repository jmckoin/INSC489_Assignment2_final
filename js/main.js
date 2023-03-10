// bring in data
const data = [
    {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },
    {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},
    {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},
    {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
];

// append svg element to body tag
d3.select('body').append('svg')
    .attr('width', 600)
    .attr('height', 500);

// set margins within the svg window
var svg = d3.select('svg'),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

// add chart title
svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 125)
    .attr("y", 100)
    .attr("text-size", 12)
    .attr("text-align", "center")
    .text("The Enrollment of UT Campuses")


// set the xscale (categorical used bands) and yscale (linear because quantitative data)
var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range ([height, 0]);

// append g tag to adjust how the data will be displayed
var g = svg.append('g')
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

// map domain for x and y axis (input domain, output range)
xScale.domain(data.map(function(d) { return d.campus; }));
yScale.domain([0, d3.max(data, function(d) { return d.enrollment; })]);

// group x-axis under one g tag, transform to shift xaxis towards the bottom then insert axis
// with the call
g.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

// group y-axis and added ticks
g.append('g')
    .call(d3.axisLeft(yScale).ticks(5)).append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value");
// create
g.selectAll("rect")
    .data(data)
    .enter().append('rect')
    // use scales created earlier to pass in campus/enrollment data
    .attr("x", function(d) { return xScale(d.campus); })
    .attr("y", function(d) { return yScale(d.enrollment); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d.enrollment); })
    .attr("fill", function(d) { return d.color; })
