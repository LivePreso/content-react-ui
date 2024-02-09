import { CategoryChart } from './CategoryChart';

export default {
  component: CategoryChart,
  title: 'Components/Charts/CategoryChart'
};

export const Default = {
  args: {
    width: '100%',
    height: '500px',
    tooltips: {
      active: true,
      combineSeries: true
    },
    series: [
      {
        type: 'column',
        name: 'Room Nights',
        dataFieldX: 'hotel',
        dataFieldY: 'room_nights',
        showValue: true
      }
    ],
    yAxes: [
      {
        name: 'Room Nights',
        key: 'room_nights'
      }
    ],
    data: [
      {
        room_nights: '150',
        hotel: 'Grand Plaza'
      },
      {
        room_nights: '200',
        hotel: "Ceasar's"
      },
      {
        room_nights: '100',
        hotel: 'Hampton Town'
      }
    ]
  }
};

export const DoubleAxis = {
  args: {
    width: '100%',
    height: '500px',
    series: [
      {
        type: 'column',
        name: 'Room Nights',
        dataFieldX: 'hotel',
        dataFieldY: 'room_nights',
        valueAxisKey: 'room_nights'
      },
      {
        type: 'column',
        name: 'Room Nights LY',
        dataFieldX: 'hotel',
        dataFieldY: 'room_nights_ly',
        valueAxisKey: 'room_nights'
      },
      {
        type: 'line',
        name: 'ADR',
        dataFieldX: 'hotel',
        dataFieldY: 'adr',
        valueAxisKey: 'adr'
      },
      {
        type: 'line',
        name: 'ADR LY',
        dataFieldX: 'hotel',
        dataFieldY: 'adr_ly',
        valueAxisKey: 'adr'
      }
    ],
    yAxes: [
      {
        title: 'Room Nights',
        key: 'room_nights'
      },
      {
        title: 'ADR',
        key: 'adr',
        opposite: true
      }
    ],
    data: [
      {
        room_nights: 125,
        room_nights_ly: 150,
        adr: 1200,
        adr_ly: 1000,
        hotel: 'Grand Plaza'
      },
      {
        room_nights: 230,
        room_nights_ly: 200,
        adr: 1500,
        adr_ly: 1570,
        hotel: "Ceasar's"
      },
      {
        room_nights: 80,
        room_nights_ly: 100,
        adr: 2180,
        adr_ly: 2100,
        hotel: 'Hampton Town'
      }
    ]
  }
};
