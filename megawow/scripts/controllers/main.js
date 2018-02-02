'use strict';

/* Angular Functions */
angular.module('equationCalculator2App')
  .controller('MyCtrl', function ($scope) {
    var vm = $scope;
    vm.result = 'a*x + b: ';
    vm.thePattern = /^-?\d*\.{0,1}\d+$/;

    vm.plotClear = function() {
        d3.selectAll('g > *').remove();
    };

    vm.plotGraph = function (_nodes) {
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
       vm.plotClear();
       // bind the object with the canvas to render
       var vis = d3.select('#visualisation')
         .append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
         .append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

       // the data
       var nodes = _nodes;
       // var nodes = [{x: 30, y: 50},{x: 50, y: 80},{x: 90, y: 120},{x: 120, y: 90}];

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

    vm.calculateEquation = function(a, b, c, x){
      // param was read as text because input type="text".
      // These Number() are to make sure when its negative it read as num.
      a = Number(a);
      b = Number(b);
      c = Number(c);

      var y = (a * (x*x) + b*x + c);

      return Number(y);
    };

    vm.validated = function() {
      if(typeof vm.valA === "undefined" || typeof vm.valB === "undefined" || typeof vm.valC === "undefined"){
        console.log("undefined!");
        return;
      }

      if(!vm.myForm.$valid){
        console.log("invalid!");
        return ;
      }

      if (vm.valA.length > 0 && vm.valB.length > 0 && vm.valC.length > 0) {
        console.log("plotting");
        // var to store the data. based on JSON
        var nodes = [];

        for (var i = -10; i <= 10; i++){
            var j = vm.calculateEquation(vm.valA, vm.valB, vm.valC, i);

            nodes.push({
              x: i,
              y: j
            });
        }

        try{
          // vm.result = (JSON.stringify(nodes));
          vm.result = vm.valA + '*x^2 + ' + vm.valB + ' *x + ' + vm.valC + ':';
          vm.plotGraph(nodes);
        } catch(err){
          vm.result = (err.message);
        }
      }
    };

    vm.resetResult = function () {
      console.log("reset!");
      vm.plotClear();
      vm.result = 'a*x + b: ';
    };

    vm.getA = function(){
      if(typeof vm.valA === "undefined"){
        console.log("undefined!");
        return;
      }

      if(vm.valA.length === 0 || isNaN(vm.valA) || !isFinite(vm.valA)) {
        vm.myForm.$valid = false;
        vm.resetResult();
      } else {
        console.log("try try");
        vm.validated();
      }
    };

    vm.getB = function(){
      if(typeof vm.valB === "undefined"){
        console.log("undefined!");
        return;
      }

      if(vm.valB.length === 0 || isNaN(vm.valB) || !isFinite(vm.valB)) {
        vm.myForm.$valid = false;
        vm.resetResult();
      } else {
        console.log("try try");
        vm.validated();
      }
    };

    vm.getC = function(){
      if(typeof vm.valC === "undefined"){
        console.log("undefined!");
        return;
      }

      if(vm.valC.length === 0 || isNaN(vm.valC) || !isFinite(vm.valC)) {
        vm.myForm.$valid = false;
        vm.resetResult();
      } else {
        console.log("try try");
        vm.validated();
      }
    };

  });
