import {useState} from 'react';

export default Schedule = (props) => {

    //TODO: for user experience, have the placeholder value for input to be today's date. 
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    //takes the schedule as an array from the props, this will be an JSON object array. 
    const [schedule, setSchedule] = useState([])

    


    return (
        <form>
            
            <input type="text" placeholder='Sunday' value={date}/>
            <input type="text" placeholder='3 PM' value= {time}/>
            <input type="text" placeholder='Shrimping out on the water' value={description} />
            {/** Currently does nothing, will send data off to function that will process it and */}
            <button>Add to Scehdule</button>
        </form>
    )


}