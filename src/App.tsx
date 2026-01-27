import { useReducer, useState } from "react"
import RangeSlider from "./components/RangeSlider"
import TextField from "./components/TextField"
import UploadFile from "./components/UploadFile"
import TimeSlot from "./components/TimeSlot"
import WorkoutCalendar from "./components/WorkoutCalendar"
import SubmitButton from "./components/SubmitButton"
import { SUBMIT_FORM_URL } from "./api/urls"
import axios from "axios"

type State = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  selectedDate: Date | null;
  time: string | null;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: string | number | File | Date | null }
  | { type: 'SET_DATE'; date: Date }
  | { type: 'SET_TIME'; time: string };

function reducer(state: State, action: Action):State {
  const { type } = action;

  switch (type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'SET_DATE':
      return {
        ...state,
        selectedDate: action.date,
        time: null,
      }
    case 'SET_TIME':
      return {
        ...state,
        time: action.time
      }
    default:
      return state;
  }
}

function App() {
  const [formState, dispatch] = useReducer(reducer, {
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null,
    selectedDate: null,
    time: null
  }) 

  const handleTextInput = (field: keyof State, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  const handleAgeInput = (value: number) => {
    dispatch({ type: 'SET_FIELD', field: 'age', value})
  }

  const handlePhotoInput = (file: File | null) => {
    dispatch({ type: 'SET_FIELD', field: 'photo', value: file})
  }

  const handleDateInput = (date: Date) => {
    dispatch({ type: 'SET_DATE', date: date})
  }

  const handleTimeInput = (time: string) => {
    dispatch({ type: 'SET_TIME', time: time})
  }

  const [isEmailValid, setIsEmailValid] = useState(true);

  const TimeSlots = ['12:00', '14:00', '16:30', '18:30', '20:00'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid) return;

    const data = new FormData();

    data.append('firstName', formState.firstName);
    data.append('lastName', formState.lastName);
    data.append('email', formState.email);
    data.append('age', String(formState.age));
    data.append('selectedDate', formState.selectedDate!.toISOString());
    data.append('time', formState.time!);
    data.append('photo', formState.photo!);

    axios.post(SUBMIT_FORM_URL, data)
      .then(res => console.log('Success:', res.data))
      .catch(err => console.error('Error:', err));
  }

  return (
    <main className='min-h-screen bg-lavander-50 py-24 px-6 text-deepIndigo'>
      <form className='mx-auto w-full max-w-106.5' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-medium'>
          Personal Info
        </h1>

        <div className='flex flex-col gap-6 my-8'>
          <TextField
            label={'First Name'}
            name={'firstName'}
            value={formState.firstName}
            onChange={handleTextInput}
          />

          <TextField
            label={'Last Name'}
            name={'lastName'}
            value={formState.lastName}
            onChange={handleTextInput}
          />

          <TextField
            label={'Email Address'}
            name={'email'}
            type={'email'}
            value={formState.email}
            onChange={handleTextInput}
            onValidityChange={setIsEmailValid}
          />

          <RangeSlider
            min={8}
            max={100}
            label={'Age'}
            value={formState.age}
            onChange={handleAgeInput}
          />

          <UploadFile
            file={formState.photo}
            onChange={handlePhotoInput}
          />
        </div>

        <h1 className='text-2xl font-medium mb-4'>Your Workout</h1>

        <div className='flex flex-col gap-4 sm:flex-row'>
          <section className='sm:w-8/10'>
            <p className='mb-2'>
              Date
            </p>
            <WorkoutCalendar
              selectedDate={formState.selectedDate}
              onDateSelect={handleDateInput}
            />
          </section>

          {formState.selectedDate && (
            <section className='sm:w-2/10'>
              <p className='mb-2'>Time</p>
              <div className='grid grid-cols-4 gap-2 sm:grid-cols-1'>
                {TimeSlots.map((time) => (
                  <TimeSlot
                    key={time}
                    label={time}
                    isSelected={formState.time === time}
                    onSelect={handleTimeInput}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <SubmitButton
          disabled={
            !formState.firstName ||
            !formState.lastName ||
            !formState.email ||
            !isEmailValid ||
            !formState.photo ||
            !formState.selectedDate ||
            !formState.time
          }
        />
      </form>
    </main>
  )
}

export default App
