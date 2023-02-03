import { createRef, useEffect } from "react";
import Chart from 'chart.js/auto'

export const Featured = ({ item }) => {
  const chartRef = createRef();

  useEffect(() => {
    if (chartRef?.current) {
      const chartCanvas = chartRef.current;
      const chartContext = chartCanvas.getContext('2d');

      const data = {
        // For improvement: use a date util to get these labels
        labels: ['Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023'],
        datasets: [{
          data: item.history.c,
          borderColor: "#3e95cd",
          fill: false,
          label: 'close prices'
        },
        {
          data: item.history.h,
          borderColor: "#8e5ea2",
          fill: false,
          label: 'high prices'
        },
        {
          data: item.history.l,
          borderColor: "#3cba9f",
          fill: false,
          label: 'low prices'
        },
        {
          data: item.history.o,
          borderColor: "#e8c3b9",
          fill: false,
          label: 'open prices'
        }]
      };

      if (chartContext) {
        const chart = new Chart(
          chartContext,
          {
            type: 'line',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Stock candles data for the past 12 months'
                }
              }
            },
          }
        );

        return () => {
          chart.destroy();
        };
      }

    }
  }, [item, chartRef]);

  if (item.name) {
    return (
      <div className="bg-indigo-200/10 mt-20">
        <div className="py-10 px-6 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <img className="h-20 w-20 my-5 rounded-full inline-block" src={item.logo} alt={item.name} />
            <h2 className="text-4xl font-bold tracking-tight text-gray-600">
              {item.name}
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600">Latest price at {item.price} {item.currency}</p>
          </div>
          <div className="my-10"><canvas ref={chartRef}></canvas></div>
        </div>
      </div>
    )
  }
  else {
    return (<></>)
  }
}

export default Featured;