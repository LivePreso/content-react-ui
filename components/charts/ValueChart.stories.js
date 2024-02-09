import { ValueChart } from './ValueChart';

export default {
  component: ValueChart,
  title: 'Components/Charts/ValueChart'
};

export const Default = {
  args: {
    width: '100%',
    height: '500px',
    tooltips: {
      active: true
    },
    series: [
      {
        type: 'bubble',
        name: 'The data',
        dataFieldX: 'adr',
        dataFieldY: 'room_nights'
      }
    ],
    yAxes: [
      {
        title: 'Room Nights',
        key: 'room_nights'
      }
    ],
    data: [
      {
        room_nights: 150,
        adr: 1000
      },
      {
        room_nights: 200,
        adr: 1500
      },
      {
        room_nights: 100,
        adr: 2000
      }
    ]
  }
};

export const HeatBubble = {
  args: {
    width: '100%',
    height: '500px',
    series: [
      {
        type: 'bubble',
        name: 'The data',
        dataFieldX: 'adr',
        dataFieldY: 'room_nights',
        dataFieldHeat: 'rank',
        dataFieldName: 'country',
        showValue: true
      }
    ],
    xAxis: {
      title: 'Ranking'
    },
    yAxes: [
      {
        title: 'Room Nights',
        key: 'room_nights'
      }
    ],
    data: [
      {
        country: 'Spain',
        room_nights: 150,
        adr: 1000,
        rank: 1
      },
      {
        country: 'UK',
        room_nights: 200,
        adr: 1500,
        rank: 2
      },
      {
        country: 'Australia',
        room_nights: 100,
        adr: 2000,
        rank: 3
      }
    ]
  }
};
