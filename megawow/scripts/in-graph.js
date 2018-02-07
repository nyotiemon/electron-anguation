'use strict';
const ipc = require('electron').ipcRenderer;

var plotClear2 = function () {
    d3.selectAll('g > *').remove();
};

var plotGraph2 = function (_nodes) {
    var margin = {top: 40, right: 20, bottom: 30, left: 20},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .curve(d3.curveCatmullRomOpen)
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    // deletes all of the "g" elements previously created
    plotClear2();
    // bind the object with the canvas to render
    var vis = d3.select('#visualisation-standalone')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // the data
    var nodes = _nodes;
    // var nodes = [{x: 30, y: 50},{x: 50, y: 80},{x: 90, y: 120},{x: 120, y: 90}];

    console.log(JSON.stringify(nodes));
    // scale the range of the data
    x.domain(d3.extent(nodes, function(d) { return d.x; }));
    y.domain(d3.extent(nodes, function(d) { return d.x; }));

    // add the X Axis
    vis.append('g')
        .attr('transform', 'translate(0,' + height / 2 + ')')
        .call(d3.axisBottom(x));

    // add the Y Axis
    vis.append('g')
        .attr('transform', 'translate(' + width / 2 + ', 0)')
        .call(d3.axisLeft(y));

    // add the valueline path.
    vis.append('path')
        .datum(nodes)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', valueline);
    };

ipc.on('theNodes', (event, message) => {
    console.log("trying to call plotGraph2");
    console.log(JSON.stringify(message));
    plotGraph2(message);
});