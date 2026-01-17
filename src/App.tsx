import RangeSlider from "./components/RangeSlider"
import TextField from "./components/TextField"
import UploadFile from "./components/UploadFile"

function App() {
  return (
    <main className='min-h-screen bg-lavander-50 py-24 px-6 text-deepIndigo'>
      <form className='mx-auto w-full max-w-[426px]'>
        <h1 className='text-2xl font-medium mb-8'>
          Personal Info
        </h1>

        <div className='flex flex-col gap-6'>
          <TextField label={'First Name'} name={'firstName'} />
          <TextField label={'Last Name'} name={'lastName'} />
          <TextField label={'Email Address'} name={'email'} type={'email'} />
          <RangeSlider min={8} max={100} label={'Age'} />
          <UploadFile />
        </div>
      </form>
    </main>
  )
}

export default App
