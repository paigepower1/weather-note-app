// import './node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from "react-big-calendar";

// for (let i = 0; i < AllEventsInUsersFirebase.length; i++) {
//     {
//         start:idkey.startDate
//         ect
//     }
// }

const events = [
    {
        start: '2018-03-26',
        end: '2018-03-28',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2018-03-26',
        end: '2018-03-28',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];


export default events