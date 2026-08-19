/*
 * Source snapshot for the Uber project-detail page.
 *
 * Provenance:
 * - Exact published values and ranges: Uber_Ride_Analytics_Result.pdf
 * - Exact narrative/KPI context: README.md in Nothing0g/Uber_ride_demand_analysis
 * - Hourly booking series: the existing portfolio's report data, which was already
 *   authored from the original project analysis and is retained here as a source
 *   snapshot rather than regenerated or simulated data.
 *
 * The repository currently publishes the PDF/README but not the underlying CSV.
 * Values not explicitly published in those artifacts are intentionally not inferred.
 */
window.UBER_DATA = {
  source: 'Nothing0g/Uber_ride_demand_analysis',
  sourceArtifacts: ['README.md', 'Uber_Ride_Analytics_Result.pdf'],
  bookings: 150000,
  days: 365,
  hourlyBookings: [2200, 1800, 1600, 1400, 1320, 1800, 3200, 5400, 7600, 9000, 8200, 7100, 7400, 6900, 6600, 7000, 7900, 10200, 12400, 11500, 9800, 7600, 5200, 3200],
  hourlyLabels: Array.from({ length: 24 }, (_, hour) => `${hour}:00`),
  peakHour: { label: '6 PM', bookings: 12400 },
  troughHour: { label: '4 AM', bookings: 1320 },
  weekdayWeekendAverage: [
    { label: 'Weekday average', value: 21412 },
    { label: 'Weekend average', value: 21470 },
  ],
  dailyRange: { min: 21215, max: 21644, spread: '<2%' },
  failureRange: { low: 24, high: 26, quietHour: { label: '4 AM', value: 24.9 }, busyHour: { label: '6 PM', value: 25.4 }, label: '24–26%' },
  fareRange: { min: 499, max: 519, label: '₹499–₹519' },
  distanceRange: { min: 25.5, max: 26.5, label: '25.5–26.5 km' },
  rollingAverageBand: { min: 391, max: 434, label: '391–434 bookings/day' },
  pickupConcentration: [
    { label: 'Top 15 pickup zones', value: 9.2 },
    { label: 'Other 161 zones', value: 90.8 },
  ],
};
