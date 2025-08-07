import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

function AnalyticDashboard() {
  const demandChartRef = useRef(null);
  const engagementChartRef = useRef(null);
  const demandChartInstance = useRef(null);
  const engagementChartInstance = useRef(null);

  useEffect(() => {
    const demandCanvas = demandChartRef.current;
    const engagementCanvas = engagementChartRef.current;

    // Destroy existing charts if they exist
    if (demandChartInstance.current) {
      demandChartInstance.current.destroy();
    }
    if (engagementChartInstance.current) {
      engagementChartInstance.current.destroy();
    }

    try {
      // Create Demand by Region chart
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

      // Create User Engagement chart
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
    } catch (error) {
      console.error('Error initializing charts:', error);
    }

    // Cleanup on unmount
    return () => {
      if (demandChartInstance.current) {
        demandChartInstance.current.destroy();
      }
      if (engagementChartInstance.current) {
        engagementChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="mt-6 px-6">
      {/* <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2> */}
      
    </div>
  );
}

export default AnalyticDashboard;