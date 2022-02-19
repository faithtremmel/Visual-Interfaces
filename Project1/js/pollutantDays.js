class PollutantDaysChart{
    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: _config.containerWidth || 500,
          containerHeight: _config.containerHeight || 140,
          margin: {top: 40, right: 50, bottom: 50, left: 50},
          tooltipPadding: _config.tooltipPadding || 15
    
        }
    
        this.data = _data[0].pollutant_percents; 
        this.initVis();
    }

    
    initVis() {

        let vis = this; 
    
        // Width and height as the inner dimensions of the chart area- as before
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
    
        vis.xScale = d3.scaleBand()
            .domain(vis.data.map(d => d.name))
            .range([0, vis.width])
            .paddingInner(0.15);

        vis.yScale = d3.scaleLinear()
            .domain([0,100])
            .range([vis.height, 0]);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);
    
        vis.xAxis = d3.axisBottom(vis.xScale);    
        vis.yAxis = d3.axisLeft(vis.yScale);

        // Append x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`)
        .call(vis.xAxis);

        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis')
        .call(vis.yAxis); 

        vis.colorScale = d3.scaleOrdinal()
            .range(['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600'])
            .domain(['CO','NO2','Ozone','SO2','PM2.5','PM10']);

        vis.updateVis();
    }

     //leave this empty for now
    updateVis() { 
        let vis = this;
       
        vis.renderVis()
    }

    renderVis() {
        let vis = this;

        // https://codesandbox.io/s/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-static-bar-chart?file=/js/barchart.js:4266-4325
        vis.chart.selectAll(".pollutant-bar")
            .data(vis.data)
            .join("rect")
            .attr("class", "pollutant-bar bar")
            .attr("width", vis.xScale.bandwidth())
            .transition()
            .attr("height", d => vis.height - vis.yScale(d.value))
            .attr("x", d => vis.xScale(d.name))
            .attr("y", d => vis.yScale(d.value))
            .attr("fill", d => vis.colorScale(d.name))

    }
  }
