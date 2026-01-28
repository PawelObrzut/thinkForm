import { useReducer, useEffect } from "react"
import RangeSlider from "./components/RangeSlider"
import TextInput from "./components/TextInput"
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
  | { type: 'UPDATE_PERSONAL_INFO'; key: keyof State; value: string | number | File | Date | null }
  | { type: 'SET_DATE'; date: Date }
  | { type: 'SET_TIME'; time: string };

function reducer(state: State, action: Action):State {
  const { type } = action;

  switch (type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        [action.key]: action.value
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

const TIMESLOTS = ['12:00', '14:00', '16:30', '18:30', '20:00'] as const;

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

  const handlePersonalInfo = <Key extends keyof State>(key: Key, value: State[Key]) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', key, value})
  }

  const handleDateInput = (date: Date) => {
    dispatch({ type: 'SET_DATE', date: date})
  }

  const handleTimeInput = (time: string) => {
    dispatch({ type: 'SET_TIME', time: time})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formState.email);

  const validateInput = (type: string, value: string):boolean => {
    if (!value) return false;
    if (type === 'email') {
      return emailRegex.test(value);
    }
    return true;
  }

  const isFormComplete = ():boolean => {
    return (
      formState.firstName &&
      formState.lastName &&
      formState.email &&
      isEmailValid &&
      formState.photo &&
      formState.selectedDate &&
      formState.time
    ) ? true : false;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, selectedDate, time, photo } = formState;
    if (!firstName || !lastName || !isEmailValid || !selectedDate || !time || !photo) return;

    const data = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      if (value instanceof File) {
        data.append(key, value);
      } else if (value instanceof Date) {
        data.append(key, value.toISOString());
      } else {
        data.append(key, String(value))
      }
    })

    axios.post(SUBMIT_FORM_URL, data)
      .then(res => console.log('Success:', res.data))
      .catch(err => console.error('Error:', err));
  }

  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }

    document.addEventListener('dragover', preventDefaults);
    document.addEventListener('drop', preventDefaults);

    return () => {
      document.removeEventListener('dragover', preventDefaults);
      document.removeEventListener('drop', preventDefaults);
    }
  }, [])

  return (
    <main className='min-h-screen bg-lavander-50 py-24 px-6 text-deepIndigo'>
      <form className='mx-auto w-full max-w-106.5' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-medium'>
          Personal Info
        </h1>

        <div className='flex flex-col gap-6 my-8'>
          <TextInput
            label={'First Name'}
            name={'firstName'}
            value={formState.firstName}
            onChange={handlePersonalInfo}
            validateInput={validateInput}
          />

          <TextInput
            label={'Last Name'}
            name={'lastName'}
            value={formState.lastName}
            onChange={handlePersonalInfo}
            validateInput={validateInput}
          />

          <TextInput
            label={'Email Address'}
            name={'email'}
            type={'email'}
            value={formState.email}
            onChange={handlePersonalInfo}
            validateInput={validateInput}
          />

          <RangeSlider
            min={8}
            max={100}
            label={'Age'}
            value={formState.age}
            onChange={(value) => handlePersonalInfo('age', value)}
          />

          <UploadFile
            file={formState.photo}
            onChange={(file) => handlePersonalInfo('photo', file)}
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
                {TIMESLOTS.map((time) => (
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
          disabled={!isFormComplete()}
        />
      </form>
    </main>
  )
}

export default App
