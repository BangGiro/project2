import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './Schedules.css'
import DetailSc from './DetailSc'


function ScheduleCalender() {


    return (
        <div className='Schedules_container'> 
            <div className='fc_container'>
                <Fullcalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={false}
                    events={[
                    { title: 'event 1', date: '2024-10-08' },
                    { title: 'event 2', date: '2019-04-02' }
                    ]}
                />
            </div>

            <DetailSc/>
        </div>

    )

}

export default ScheduleCalender;