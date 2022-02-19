class LineChart{
    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: _config.containerWidth || 500,
          containerHeight: _config.containerHeight || 140,
          margin: {top: 40, right: 50, bottom: 50, left: 50},
          tooltipPadding: _config.tooltipPadding || 15
    
        }
    
        this.data = _data; 
    
        this.initVis();
    }
    
    initVis() {

        let vis = this; 
    
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
    
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);
    
            
        vis.xScale = d3.scaleLinear()
            .range([0, vis.width]);


        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);
           
    
        // Initialize axes
        // https://codesandbox.io/s/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-stacked-area-chart?file=/js/stackedAreaChart.js:1057-1131
        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickFormat(d3.format("d"));
        
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
    
        vis.updateVis();  
    }

    updateVis() { 
        let vis = this;

        vis.xScale.domain(d3.extent(vis.data, d => parseInt(d.year)))

        let maxYVal = Math.max(d3.max(vis.data, d => parseInt(d.median_aqi)), d3.max(vis.data, d => parseInt(d.percentile_aqi)), d3.max(vis.data, d => parseInt(d.max_aqi)))
        let minYVal = Math.min(d3.min(vis.data, d => parseInt(d.median_aqi)), d3.min(vis.data, d => parseInt(d.percentile_aqi)), d3.min(vis.data, d => parseInt(d.max_aqi)))
        vis.yExtent = [minYVal, maxYVal]
        vis.yScale.domain(vis.yExtent) 

        //Initialize line generator helper functions
        vis.median_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.median_aqi));

        vis.max_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.max_aqi));

        vis.percent_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.percentile_aqi));
     
        vis.renderVis()
    }

    renderVis() {

        let vis = this
        // Add line path 
        let medianLine = vis.chart.selectAll('.median-line')
        
        medianLine.data([vis.data])
            .join('path')
            .attr('stroke',  '#ffa600')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'median-line')
            .transition()
            .attr('d', vis.median_line);

        // Add line path 
        let maxLine = vis.chart.selectAll('.max-line')
        
        maxLine.data([vis.data])
            .join('path')
            .attr('stroke',  '#003f5c')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'max-line')
            .transition()
            .attr('d', vis.max_line);


         // Add line path 
        let percentLine = vis.chart.selectAll('.percent-line')
        
        percentLine.data([vis.data])
            .join('path')
            .attr('stroke',  '#bc5090')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'percent-line')
            .transition()
            .attr('d', vis.percent_line);


        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }

    
}