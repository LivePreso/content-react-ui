import { QuadrantChart } from './QuadrantChart';

export default {
  component: QuadrantChart,
  title: 'Components/Charts/QuadrantChart'
};

export const Default = {
  args: {
    width: '100%',
    height: '500px',
    tooltips: {
      active: true,
      text: '{name}'
    },
    series: [
      {
        type: 'bubble',
        name: 'Same star rating (City)',
        dataFieldX: 'city_impressions',
        dataFieldY: 'city_booking_conversion'
      },
      {
        type: 'bubble',
        name: 'Same star rating (Area)',
        dataFieldX: 'area_impressions',
        dataFieldY: 'area_booking_conversion'
      },
      {
        type: 'bubble',
        name: 'Comparable groups',
        dataFieldX: 'comp_set_impressions',
        dataFieldY: 'comp_set_booking_conversion'
      },
      {
        type: 'bubble',
        name: 'Your property',
        dataFieldX: 'property_impressions',
        dataFieldY: 'property_booking_conversion'
      }
    ],
    quadrants: [
      {
        label: 'High CVRs / Low PVs'
      },
      {
        label: 'High CVRs & PVs'
      },
      {
        label: 'Low CVRs & PVs'
      },
      {
        label: 'Low CVRs / High PVs'
      }
    ],
    xAxis: {
      title: 'Impressions',
      min: 0,
      max: 100
    },
    yAxes: [
      {
        title: 'Booking conversion (%)',
        key: 'booking_conversion',
        min: 0,
        max: 100
      }
    ],
    data: [
      {
        city_booking_conversion: 80,
        city_impressions: 20,
        area_booking_conversion: 50,
        area_impressions: 50,
        comp_set_booking_conversion: 20,
        comp_set_impressions: 100,
        property_booking_conversion: 70,
        property_impressions: 30
      }
    ]
  }
};
