import React from 'react';

import {
    Chart as ChartJS,      //Main Chart.js engine
    CategoryScale,         //Allows to use text on x-axis like dates
    LinearScale,           //Allows to use numbers on y-axis (currency values)
    PointElement,          //For the dots on line
    LineElement,           //Draws the line connecting the dots
    Title,                 //For the chart title 
    Tooltip,               //Shows the popup box when we hover a point
    Legend,                //Shows the label "USD to INR" at the top
    Filler,
    plugins,
    Ticks,                //To fill the color under the line 
}   from 'chart.js';

import {Line} from 'react-chartjs-2';

//Registering the tools so that Chart.js knows they exist.

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

//from to to and current rate via arguments

function ChartComponent({from, to, currentRate}) {

// Generating dates

    const dates= [];

//Looping 7 times to get the last week
    for (let i = 6; i >= 0; i--){
        const d = new Date(); // gives todays date
        
        d.setDate(d.getDate() - i);

//Formatting the date to look nice
        dates.push(d.toLocaleDateString('en-US', {month:'short' , day:'numeric'}));
    }

//For history prices the API is paid thus we are stimulating it by mapping dates array and generating random prices for each day
    const dataPoints = dates.map(() => {
        
        const fluctuation = (Math.random() - 0.5) * 0.1;

        //To avoid bigger decimal values
        return (currentRate * (1 + fluctuation)).toFixed(4);
    });

// CHART DATA 

    const data = {
        labels : dates,     //lables for x-axis (from dates array)

        datasets : [
            {
            //Label for the top of the chart    
            label : `${from.toUpperCase()} to ${to.toUpperCase()} (7 Days)`,

            data : dataPoints,      //Simulated Prices

            //STYLING
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.4,
            fill: true,

            },
        ],
    };

    const options = {

        responsive : true,      //For making chart resize automatically on mobile
        plugins : {
            legend : {
                labels : {color : 'white'}
            },
        },

        scales : {
            //x-axis 
            x: {
                ticks : { color : 'rgba(255, 255, 255, 0.7)'},//Date's Color : light gray
                grid :  { display : false}  // Hiding vertical grid lines
            },
            //y-axis
            y: {
                ticks: { color : 'rgba(255, 255, 255, 0.7)'},//Price color : light ray
                grid: { color : 'rgba(255, 255, 255, 0.1)'}  //Fainting grid lines for prices
            }
        }
    };

    //Passing the data and options objects to the line component
    return <Line options={options} data={data} />
}

export default ChartComponent;