var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "black",
                "pink",
            ],
            label: 'Bookings'
        }],
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Bookings this week'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('doughnut').getContext('2d');
    window.myDoughnut = new Chart(ctx, config);

    var ctp = document.getElementById('monthsbar').getContext('2d');
    window.myLine = new Chart(ctp, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Monthly Bookings'
            }
        }
    });


    var cte = document.getElementById('seatbar').getContext('2d');
    window.myHorizontalBar = new Chart(cte, {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Seat Populrity'
            }
        }
    });



};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var color = Chart.helpers.color;

var lineChartData = {
    labels: MONTHS,
    datasets: [{
        label: '2018',
        backgroundColor: color("green").alpha(0.5).rgbString(),
        borderColor: "green",
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};



var SEATS =  ['s1', 's9', 'c1', 'huxibit', 's45'];

var color = Chart.helpers.color;

var horizontalBarChartData = {
    labels: SEATS,
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color("red").alpha(0.5).rgbString(),
        borderColor: "red",
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};

