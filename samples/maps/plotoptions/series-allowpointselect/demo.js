$(function () {

    $.getJSON('http://www.highcharts.local/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function (data) {
        
        // Initiate the chart
        $('#container').highcharts('Map', {

            title: {
                text: 'Allow point select'
            },
            
            legend: {
                title: {
                    text: 'Population density per km²'
                }
            },

            plotOptions: {
                series: {
                    point: {
                        events: {
                            select: function () {
                                var text = 'Selected ' + this.name + ' (' + this.value + '/km²)',
                                    chart = this.series.chart;
                                if (!chart.selectedLabel) {
                                    chart.selectedLabel = chart.renderer.label(text, 0, 320)
                                        .add();
                                } else {
                                    chart.selectedLabel.attr({
                                        text: text
                                    });
                                }
                            },
                            unselect: function () {
                                var text = 'Unselected ' + this.name + ' (' + this.value + '/km²)',
                                    chart = this.series.chart;
                                if (!chart.unselectedLabel) {
                                    chart.unselectedLabel = chart.renderer.label(text, 0, 300)
                                        .add();
                                } else {
                                    chart.unselectedLabel.attr({
                                        text: text
                                    });
                                }
                            }
                        }
                    }
                }
            },

            colorAxis: {
                min: 1,
                max: 1000,
                type: 'logarithmic'
            },

            series : [{
                data : data,
                mapData: Highcharts.maps.world,
                joinBy: 'code',
                name: 'Population density',
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    hover: {
                        color: '#BADA55'
                    },
                    select: {
                        color: 'black'
                    }
                },
                tooltip: {
                    valueSuffix: '/km²'
                }
            }]
        });
    });
});