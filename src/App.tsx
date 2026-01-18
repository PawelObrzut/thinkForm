import { useState } from "react"
import RangeSlider from "./components/RangeSlider"
import TextField from "./components/TextField"
import UploadFile from "./components/UploadFile"
import TimeSlot from "./components/TimeSlot"
import WorkoutCalendar from "./components/WorkoutCalendar"
import SubmitButton from "./components/SubmitButton"
import { SUBMIT_FORM_URL } from "./api/urls"
import axios from "axios"

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  selectedDate: Date | null;
  time: string | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null as File | null,
    selectedDate: null as Date | null,
    time: null as string | null,
  });

  const TimeSlots = ['12:00', '14:00', '16:30', '18:30', '20:00'];

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

  const handleDateInput = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      selectedDate: date,
      time: null
    }));
  };

  const handleTimeInput = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('age', String(formData.age));
    data.append('selectedDate', formData.selectedDate!.toISOString());
    data.append('time', formData.time!);
    data.append('photo', formData.photo!);

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
          <TextField label={'First Name'} name={'firstName'} value={formData.firstName} onChange={handleTextInput} />
          <TextField label={'Last Name'} name={'lastName'} value={formData.lastName} onChange={handleTextInput} />
          <TextField label={'Email Address'} name={'email'} type={'email'} value={formData.email} onChange={handleTextInput} />
          <RangeSlider min={8} max={100} label={'Age'} value={formData.age} onChange={handleAgeInput} />
          <UploadFile file={formData.photo} onChange={handlePhotoInput} />
        </div>

        <h1 className='text-2xl font-medium mb-4'>Your Workout</h1>

        <div className='flex flex-col gap-4 sm:flex-row'>
          <section className='sm:w-8/10'>
            <p className='mb-2'>
              Date
            </p>
            <WorkoutCalendar
              selectedDate={formData.selectedDate}
              onDateSelect={handleDateInput}
            />
          </section>

          {formData.selectedDate && (
            <section className='sm:w-2/10'>
              <p className='mb-2'>Time</p>
              <div className='grid grid-cols-4 gap-2 sm:grid-cols-1'>
                {TimeSlots.map((time) => <TimeSlot key={time} label={time} isSelected={formData.time === time} onSelect={handleTimeInput} />)}
              </div>
            </section>
          )}
        </div>

        <SubmitButton
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.photo ||
            !formData.selectedDate ||
            !formData.time
          }
        />
      </form>
    </main>
  )
}

export default App
