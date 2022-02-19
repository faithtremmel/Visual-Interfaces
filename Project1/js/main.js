let data, lineChart, filteredData, year1, year2, state1, county1, state2, county2, county1_state_dropdown, county1_county_dropdown, county2_state_dropdown, county2_county_dropdown, counties, county1_vis1, county2_vis1, county1_vis2, county2_vis2, vis3, vis4, vis5

d3.csv('data/data.csv')
  .then(_data => {
  	console.log('Data loaded');
    data = _data

    //Process data

    currentYearAQIPercents = []
    currentYearPollutantPercents = []
    // pollutantPercents = {'year': [], 'CO': [], 'NO2': [], 'Ozone': [], 'SO2': [], 'PM2.5': [], 'PM10': []}
    counties = {};
    years = {};
    data.forEach(d => {
      d.percentile_aqi = +d.percentile_aqi;
      d.days_co = +d.days_co; 
      d.days_no2 = +d.days_no2;
      d.days_ozone = +d.days_ozone;
      d.days_pm10 = +d.days_pm10;
      d.days_pm25 = +d.days_pm25;
      d.days_so2 = +d.days_so2;
      d.days_with_aqi = +d.days_with_aqi;
      d.good_days = +d.good_days;
      d.hazardous_days = +d.hazardous_days;
      d.max_aqi = +d.max_aqi;
      d.median_aqi = +d.median_aqi;
      d.moderate_days = +d.moderate_days;
      d.unhealthy_days = +d.unhealthy_days;
      d.unhealthy_for_sensitive_group_days = +d.unhealthy_for_sensitive_group_days;
      d.very_unhealthy_days = +d.very_unhealthy_days;
      d.year = +d.year;
      // if(d.year == 2021){
        
        // if(!currentYearAQIPercents[d.year]){
        //   currentYearAQIPercents[d.year] = {}
        // }
        // if(!currentYearAQIPercents[d.year][d.state]){
        //   currentYearAQIPercents[d.year][d.state] = {}
        // }


        d.aqi_percents = [{name: "Good", value: d.good_days/d.days_with_aqi * 100}, {name: "Moderate", value: d.moderate_days/d.days_with_aqi * 100}, {name: "Unhealthy for sensitive group", value: d.unhealthy_for_sensitive_group_days/d.days_with_aqi * 100}, {name: "Unhealthy", value: d.unhealthy_days/d.days_with_aqi * 100}, {name: "Very unhealthy", value: d.very_unhealthy_days/d.days_with_aqi * 100}, {name: "Hazardous", value: d.hazardous_days/d.days_with_aqi * 100}]

        d.pollutant_percents = [{name: "CO", value: d.days_co/d.days_with_aqi * 100}, {name: "NO2", value: d.days_no2/d.days_with_aqi * 100}, {name: "Ozone", value: d.days_ozone/d.days_with_aqi * 100}, {name: "SO2", value: d.days_so2/d.days_with_aqi * 100}, {name: "PM2.5", value: d.days_pm25/d.days_with_aqi * 100}, {name: "PM10", value: d.days_pm10/d.days_with_aqi * 100}]

        // currentYearAQIPercents[d.year][d.state][d.county] = [{name: "Good", value: d.good_days/d.days_with_aqi * 100}, {name: "Moderate", value: d.moderate_days/d.days_with_aqi * 100}, {name: "Unhealthy for sensitive group", value: d.unhealthy_for_sensitive_group_days/d.days_with_aqi * 100}, {name: "Unhealthy", value: d.unhealthy_days/d.days_with_aqi * 100}, {name: "Very unhealthy", value: d.very_unhealthy_days/d.days_with_aqi * 100}, {name: "Hazardous", value: d.hazardous_days/d.days_with_aqi * 100}]
        
        // currentYearPollutantPercents.push({state: d.state, county: d.county, 
        //   percents: [{name: "CO", value: d.days_co/d.days_with_aqi * 100}, {name: "NO2", value: d.days_no2/d.days_with_aqi * 100}, {name: "Ozone", value: d.days_ozone/d.days_with_aqi * 100}, {name: "SO2", value: d.days_so2/d.days_with_aqi * 100}, {name: "PM2.5", value: d.days_pm25/d.days_with_aqi * 100}, {name: "PM10", value: d.days_pm10/d.days_with_aqi * 100}]
        // })
      // }


      if(!years[d.state]){
        years[d.state] = {}
      } 
      if(!years[d.state][d.county]){
        years[d.state][d.county] = {}
      }
      if(!years[d.state][d.county][d.year]){
        years[d.state][d.county][d.year] = d
      }

      if(!counties[d.state]){
        counties[d.state] = {}
      }
      if(!counties[d.state][d.county]){
        counties[d.state][d.county] = d
      }

    
      


      // pollutantPercents['CO'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['NO2'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['Ozone'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['SO2'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['PM2.5'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['PM10'].push(d.days_co/d.days_with_aqi * 100)
      // pollutantPercents['year'].push(d.year)

      
      // pollutantPercents[d.year].push({name: "CO", value: d.days_co/d.days_with_aqi * 100})
      // pollutantPercents[d.year].push({name: "NO2", value: d.days_co/d.days_with_aqi * 100})
      // pollutantPercents[d.year].push({name: "Ozone", value: d.days_co/d.days_with_aqi * 100})
      // pollutantPercents[d.year].push({name: "SO2", value: d.days_co/d.days_with_aqi * 100})
      // pollutantPercents[d.year].push({name: "PM2.5", value: d.days_co/d.days_with_aqi * 100})
      // pollutantPercents[d.year].push({name: "PM10", value: d.days_co/d.days_with_aqi * 100})

      // pollutantPercents.push({state: d.state, county: d.county, 
      //   percents: [{name: "CO", value: d.days_co/d.days_with_aqi * 100}, {name: "NO2", value: d.days_no2/d.days_with_aqi * 100}, {name: "Ozone", value: d.days_ozone/d.days_with_aqi * 100}, {name: "SO2", value: d.days_so2/d.days_with_aqi * 100}, {name: "PM2.5", value: d.days_pm25/d.days_with_aqi * 100}, {name: "PM10", value: d.days_pm10/d.days_with_aqi * 100}]
      // })
      // console.log(pollutantPercents)
    });


    state1 = Object.keys(counties)[0]
    state2 = state1
    county1 = Object.keys(counties[state1])[0]
    county2 = county1
    year1 = 1980
    year2 = year1
    filteredData = data.filter(d => d.state == state1 && d.county == county1);
    filteredYearData = data.filter(d => d.state == state1 && d.county == county1 && d.year == year1);

    // filteredAQIData = currentYearAQIPercents.filter(d => d.state == state && d.county == county);

    // dataByYear = d3.group(data, d => d.year)
    // currentYearData = dataByYear.get(2021)


    // Adapted from: http://bl.ocks.org/williaster/10ef968ccfdc71c30ef8
    county1_state_dropdown = d3.select(".county1-state-dropdown")
      .insert("select", "svg")
      .on("change", county1StateDropdownChange);
    county1_state_dropdown.selectAll("option")
      .data(Object.keys(counties))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county1_county_dropdown = d3.select(".county1-county-dropdown")
      .insert("select", "svg")
      .on("change", county1CountyDropdownChange);
    county1_county_dropdown.selectAll("option")
      .data(Object.keys(counties[state1]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county2_state_dropdown = d3.select(".county2-state-dropdown")
      .insert("select", "svg")
      .on("change", county2StateDropdownChange);
    county2_state_dropdown.selectAll("option")
      .data(Object.keys(counties))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county2_county_dropdown = d3.select(".county2-county-dropdown")
      .insert("select", "svg")
      .on("change", county2CountyDropdownChange);
    county2_county_dropdown.selectAll("option")
      .data(Object.keys(counties[state2]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county1_vis1 = new LineChart({
      'parentElement': '#county1-vis1',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredData)

    county1_vis2 = new PollutantsLineChart({
      'parentElement': '#county1-vis2',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredData)

    county1_year_dropdown = d3.select(".county1-year-dropdown")
      .insert("select", "svg")
      .on("change", county1YearDropdownChange);
    county1_year_dropdown.selectAll("option")
      .data(Object.keys(years[state1][county1]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county1_vis4 = new AQIDaysChart({
      'parentElement': '#county1-vis4',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredYearData)
    
    county1_vis5 = new PollutantDaysChart({
      'parentElement': '#county1-vis5',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredYearData)

    county2_vis1 = new LineChart({
      'parentElement': '#county2-vis1',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredData)

    county2_vis2 = new PollutantsLineChart({
      'parentElement': '#county2-vis2',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredData)

    // let vis3 = new LineChart({
    //   'parentElement': '#vis3',
		// 	'containerHeight': 500,
		// 	'containerWidth': 1000
    // }, data)

    county2_year_dropdown = d3.select(".county2-year-dropdown")
      .insert("select", "svg")
      .on("change", county2YearDropdownChange);
    county2_year_dropdown.selectAll("option")
      .data(Object.keys(years[state2][county2]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

    county2_vis4 = new AQIDaysChart({
      'parentElement': '#county2-vis4',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredYearData)
    
    county2_vis5 = new PollutantDaysChart({
      'parentElement': '#county2-vis5',
			'containerHeight': 400,
			'containerWidth': 700
    }, filteredYearData)

})
.catch(error => {
  console.error('Error loading the data');
  console.error(error)
});


// Adapted from: http://bl.ocks.org/williaster/10ef968ccfdc71c30ef8
var county1StateDropdownChange = function() {
      state1 = d3.select(this).property('value'),
      county1 = Object.keys(counties[state1])[0]
      year1 = Object.keys(years[state1][county1])[0]

      county1_county_dropdown.selectAll("option").remove()
      county1_year_dropdown.selectAll("option").remove()

      county1_county_dropdown.selectAll("option")
      .data(Object.keys(counties[state1]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

      county1_year_dropdown.selectAll("option")
      .data(Object.keys(years[state1][county1]))
      .enter().append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) {
          return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
      });

      filteredData = data.filter(d => d.state == state1 && d.county == county1);
      county1_vis1.data = filteredData
      county1_vis2.data = filteredData


      filteredYearData = data.filter(d => d.state == state1 && d.county == county1 && d.year == year1);
      county1_vis4.data = filteredYearData[0].aqi_percents
      county1_vis5.data = filteredYearData[0].pollutant_percents

      county1_vis1.updateVis()
      county1_vis2.updateVis()
      county1_vis4.updateVis()
      county1_vis5.updateVis()


};

var county1CountyDropdownChange = function() {
  county1 = d3.select(this).property('value'),
  year1 = Object.keys(years[state1][county1])[0]


  filteredData = data.filter(d => d.state == state1 && d.county == county1);
  filteredYearData = data.filter(d => d.state == state1 && d.county == county1 && d.year == year1);

  county1_year_dropdown.selectAll("option").remove()
  
  county1_year_dropdown.selectAll("option")
  .data(Object.keys(years[state1][county1]))
  .enter().append("option")
  .attr("value", function (d) { return d; })
  .text(function (d) {
      return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
  });
  
  county1_vis1.data = filteredData
  county1_vis2.data = filteredData
  county1_vis4.data = filteredYearData[0].aqi_percents
  county1_vis5.data = filteredYearData[0].pollutant_percents

  county1_vis1.updateVis()
  county1_vis2.updateVis()
  county1_vis4.updateVis()
  county1_vis5.updateVis()

};

var county2StateDropdownChange = function() {
  state2 = d3.select(this).property('value'),
  county2 = Object.keys(counties[state2])[0]
  year2 = Object.keys(years[state2][county2])[0]

  county2_county_dropdown.selectAll("option").remove()
  county2_year_dropdown.selectAll("option").remove()

  county2_county_dropdown.selectAll("option")
  .data(Object.keys(counties[state2]))
  .enter().append("option")
  .attr("value", function (d) { return d; })
  .text(function (d) {
      return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
  });

  county2_year_dropdown.selectAll("option")
  .data(Object.keys(years[state2][county2]))
  .enter().append("option")
  .attr("value", function (d) { return d; })
  .text(function (d) {
      return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
  });
  

  filteredData = data.filter(d => d.state == state2 && d.county == county2);
  filteredYearData = data.filter(d => d.state == state2 && d.county == county2 && d.year == year2);

  county2_vis1.data = filteredData
  county2_vis2.data = filteredData
  county2_vis4.data = filteredYearData[0].aqi_percents
  county2_vis5.data = filteredYearData[0].pollutant_percents

  county2_vis1.updateVis()
  county2_vis2.updateVis()
  county2_vis4.updateVis()
  county2_vis5.updateVis()

};

var county2CountyDropdownChange = function() {
  county2 = d3.select(this).property('value'),
  year2 = Object.keys(years[state2][county2])[0]

  filteredData = data.filter(d => d.state == state2 && d.county == county2);
  filteredYearData = data.filter(d => d.state == state2 && d.county == county2 && d.year == year2);

  county2_year_dropdown.selectAll("option").remove()

  county2_year_dropdown.selectAll("option")
  .data(Object.keys(years[state2][county2]))
  .enter().append("option")
  .attr("value", function (d) { return d; })
  .text(function (d) {
      return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
  });


  county2_vis1.data = filteredData
  county2_vis2.data = filteredData
  county2_vis4.data = filteredYearData[0].aqi_percents
  county2_vis5.data = filteredYearData[0].pollutant_percents

  county2_vis1.updateVis()
  county2_vis2.updateVis()
  county2_vis4.updateVis()
  county2_vis5.updateVis()

};

var county1YearDropdownChange = function() {
  
  year1 = d3.select(this).property('value'),

  filteredData = data.filter(d => d.state == state1 && d.county == county1 && d.year == year1);

  county1_vis4.data = filteredData[0].aqi_percents
  county1_vis5.data = filteredData[0].pollutant_percents

  county1_vis4.updateVis()
  county1_vis5.updateVis()

};

var county2YearDropdownChange = function() {
  year2 = d3.select(this).property('value'),
  filteredData = data.filter(d => d.state == state2 && d.county == county2 && d.year == year2);

  county2_vis4.data = filteredData[0].aqi_percents
  county2_vis5.data = filteredData[0].pollutant_percents

  county2_vis4.updateVis()
  county2_vis5.updateVis()

};
