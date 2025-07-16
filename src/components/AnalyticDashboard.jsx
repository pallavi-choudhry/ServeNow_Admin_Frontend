import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

function AnalyticDashboard() {
  const demandChartRef = useRef(null);
  const engagementChartRef = useRef(null);

  // Store Chart instances
  const demandChartInstance = useRef(null);
  const engagementChartInstance = useRef(null);

  useEffect(() => {
    const demandCanvas = demandChartRef.current;
    const engagementCanvas = engagementChartRef.current;

    // ✅ Destroy existing chart if it exists
    if (demandChartInstance.current) {
      demandChartInstance.current.destroy();
    }
    if (engagementChartInstance.current) {
      engagementChartInstance.current.destroy();
    }

    // ✅ Create new charts
    demandChartInstance.current = new Chart(demandCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['North', 'South', 'East', 'West'],
        datasets: [
          {
            label: 'Demand by Region',
            data: [120, 190, 300, 250],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });

    engagementChartInstance.current = new Chart(engagementCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'User Engagement',
            data: [65, 59, 80, 81],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });

    // ✅ Cleanup on unmount
    return () => {
      demandChartInstance.current?.destroy();
      engagementChartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="ml-72 mt-6 px-6">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Demand by Region</h3>
          <div className="h-64">
            <canvas ref={demandChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">User Engagement</h3>
          <div className="h-64">
            <canvas ref={engagementChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg col-span-2">
          <h3 className="text-lg font-semibold">Revenue Report</h3>
          <p>Total Revenue: $50,000</p>
          <p>Monthly Growth: 15%</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticDashboard;
