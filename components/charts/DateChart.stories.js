import { DateChart } from './DateChart';

export default {
  component: DateChart,
  title: 'Components/Charts/DateChart',
};

export const Default = {
  args: {
    width: '100%',
    height: '500px',
    series: [
      {
        type: 'column',
        name: 'Room Nights',
        dataFieldX: 'date',
        dataFieldY: 'room_nights',
      },
    ],
    yAxes: [
      {
        title: 'Room Nights',
        key: 'room_nights',
      },
    ],
    data: [
      {
        room_nights: 150,
        date: '2023-05-01',
      },
      {
        room_nights: 200,
        date: '2023-04-01',
      },
      {
        room_nights: 100,
        date: '2023-03-01',
      },
    ],
  },
};

export const DoubleAxis = {
  args: {
    tooltips: {
      active: true,
      combineSeries: true,
    },
    width: '100%',
    height: '500px',
    series: [
      {
        type: 'column',
        name: 'Room Nights',
        dataFieldX: 'date',
        dataFieldY: 'room_nights',
        valueAxisKey: 'room_nights',
      },
      {
        type: 'column',
        name: 'Room Nights LY',
        dataFieldX: 'date',
        dataFieldY: 'room_nights_ly',
        valueAxisKey: 'room_nights',
      },
      {
        type: 'line',
        name: 'ADR',
        dataFieldX: 'date',
        dataFieldY: 'adr',
        valueAxisKey: 'adr',
      },
      {
        type: 'line',
        name: 'ADR LY',
        dataFieldX: 'date',
        dataFieldY: 'adr_ly',
        valueAxisKey: 'adr',
      },
    ],
    yAxes: [
      {
        title: 'Room Nights',
        key: 'room_nights',
      },
      {
        title: 'ADR',
        key: 'adr',
        opposite: true,
      },
    ],
    data: [
      {
        room_nights: 125,
        room_nights_ly: 150,
        adr: 1200,
        adr_ly: 1000,
        date: '2023-05-01',
      },
      {
        room_nights: 230,
        room_nights_ly: 200,
        adr: 1500,
        adr_ly: 1570,
        date: '2023-04-01',
      },
      {
        room_nights: 80,
        room_nights_ly: 100,
        adr: 2180,
        adr_ly: 2100,
        date: '2023-03-01',
      },
    ],
  },
};
