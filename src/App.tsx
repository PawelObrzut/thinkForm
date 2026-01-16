import TextField from "./components/TextField"

function App() {
  return (
    <main className='bg-lavander-50 h-screen py-24 px-6 text-deepIndigo'>
      <form>
        <h1 className='text-2xl font-medium mb-8'>
          Personal Info
        </h1>

        <div className='flex flex-col gap-6'>
          <TextField label={'First Name'} name={'firstName'} />
          <TextField label={'Last Name'} name={'lastName'} />
          <TextField label={'Email Address'} name={'email'} type={'email'} />
        </div>

      </form>
    </main>
  )
}

export default App
