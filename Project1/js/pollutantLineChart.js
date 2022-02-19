class PollutantsLineChart{
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
            .domain([0,100]) 
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

        vis.colors = {'CO':'#003f5c','NO2':'#444e86','Ozone':'#955196','SO2':'#dd5182','PM2.5':'#ff6e54','PM10':'#ffa600'}

        vis.updateVis(); 
    }


    updateVis() { 
        let vis = this;

        vis.xScale.domain(d3.extent(vis.data, d => d.year))

        //Initialize line generator helper functions
        vis.no2_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_no2/d.days_with_aqi * 100));

        vis.co_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_co/d.days_with_aqi * 100));

        vis.ozone_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_ozone/d.days_with_aqi * 100));
        
        vis.so2_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_so2/d.days_with_aqi * 100));

        vis.pm25_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_pm25/d.days_with_aqi * 100));

        vis.pm10_line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.days_pm10/d.days_with_aqi * 100));
        
        vis.renderVis()
    }

    renderVis() {

        let vis = this
        // Add line path 
        vis.chart.selectAll('.no2-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['NO2'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'no2-line')
            .transition()
            .attr('d', vis.no2_line);

        // Add line path 
        vis.chart.selectAll('.co-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['CO'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'co-line')
            .transition()
            .attr('d', vis.co_line);

            // Add line path 
        vis.chart.selectAll('.ozone-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['Ozone'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'ozone-line')
            .transition()
            .attr('d', vis.ozone_line);

        vis.chart.selectAll('.so2-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['SO2'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'so2-line')
            .transition()
            .attr('d', vis.so2_line);
            
        vis.chart.selectAll('.pm25-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['PM2.5'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'pm25-line')
            .transition()
            .attr('d', vis.pm25_line);

        vis.chart.selectAll('.pm10-line')
            .data([vis.data])
            .join('path')
            .attr('stroke',  vis.colors['PM10'])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'pm10-line')
            .transition()
            .attr('d', vis.pm10_line);

        vis.xAxisG.call(vis.xAxis);

    }
}