import { useState } from "react"
import Calendar from "react-calendar"
import RangeSlider from "./components/RangeSlider"
import TextField from "./components/TextField"
import UploadFile from "./components/UploadFile"

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null as File | null,
  })

  const handleTextInput = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

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

  return (
    <main className='min-h-screen bg-lavander-50 py-24 px-6 text-deepIndigo'>
      <form className='mx-auto w-full max-w-[426px]'>
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
        <div className='max-w-[70%]'>
          <Calendar />
        </div>
      </form>
    </main>
  )
}

export default App
