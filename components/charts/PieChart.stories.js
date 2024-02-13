import { PieChart } from './PieChart';

export default {
  component: PieChart,
  title: 'Components/Charts/PieChart',
};

export const Default = {
  args: {
    width: '100%',
    height: '500px',
    tooltips: {
      active: true,
    },
    series: {
      name: 'Room Nights',
      dataFieldCategory: 'hotel',
      dataFieldValue: 'room_nights',
      showValue: true,
    },
    data: [
      {
        room_nights: '150',
        hotel: 'Grand Plaza',
      },
      {
        room_nights: '200',
        hotel: "Ceasar's",
      },
      {
        room_nights: '100',
        hotel: 'Hampton Town',
      },
    ],
  },
};

export const BasicDonut = {
  args: {
    width: '100%',
    height: '500px',
    innerRadius: 70,
    series: {
      name: 'Room Nights',
      dataFieldCategory: 'hotel',
      dataFieldValue: 'room_nights',
      showLabels: false,
      showValue: true,
    },
    data: [
      {
        room_nights: '150',
        hotel: 'Grand Plaza',
      },
      {
        room_nights: '200',
        hotel: "Ceasar's",
      },
      {
        room_nights: '100',
        hotel: 'Hampton Town',
      },
    ],
  },
};
