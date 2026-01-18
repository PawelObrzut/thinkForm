import { useState } from "react"
import RangeSlider from "./components/RangeSlider"
import TextField from "./components/TextField"
import UploadFile from "./components/UploadFile"
import TimeSlot from "./components/TimeSlot"
import WorkoutCalendar from "./components/WorkoutCalendar"

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null as File | null,
    time: null as string | null,
  });

  const handleTextInput = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }))
  };

  const handleAgeInput = (value: number) => {
    setFormData(prev => ({
      ...prev,
      age: value,
    }));
  };

  const handlePhotoInput = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      photo: file,
    }));
  };

  const handleTimeInput = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time,
    }));
  };

  const TimeSlots = ['12:00', '14:00', '16:30', '18:30', '20:00'];

  return (
    <main className='min-h-screen bg-lavander-50 py-24 px-6 text-deepIndigo'>
      <form className='mx-auto w-full max-w-106.5'>
        <h1 className='text-2xl font-medium'>
          Personal Info
        </h1>

        <div className='flex flex-col gap-6 my-8'>
          <TextField label={'First Name'} name={'firstName'} value={formData.firstName} onChange={handleTextInput} />
          <TextField label={'Last Name'} name={'lastName'} value={formData.lastName} onChange={handleTextInput} />
          <TextField label={'Email Address'} name={'email'} type={'email'} value={formData.email} onChange={handleTextInput} />
          <RangeSlider min={8} max={100} label={'Age'} value={formData.age} onChange={handleAgeInput} />
          <UploadFile file={formData.photo} onChange={handlePhotoInput} />
        </div>

        <h1 className='text-2xl font-medium'>Your Workout</h1>


        <div className='flex flex-col gap-4 sm:flex-row'>
          <section className='sm:w-8/10'>
            <p className='mb-2'>
              Date
            </p>
            <WorkoutCalendar />
          </section>

          <section className='sm:w-2/10'>
            <p className='mb-2'>Time</p>
            <div className='grid grid-cols-4 gap-2 sm:grid-cols-1'>
              {TimeSlots.map((time) => <TimeSlot key={time} label={time} isSelected={formData.time === time} onSelect={handleTimeInput} />)}
            </div>
          </section>

        </div>


        <button 
          type='submit'
          className='
            cursor-pointer
            w-full my-12 p-4 text-white font-medium text-lg
            bg-active-100 rounded border border-lavander-100
            '>
              Send Application
        </button>
      </form>
    </main>
  )
}

export default App
