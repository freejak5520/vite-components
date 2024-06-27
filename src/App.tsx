import './App.css'
import { HorizontalScrollExample } from './components/horizontal-scroll'
import Select from './components/select'

function App() {

  return (
    <div className='max-w-screen-lg gap-4 flex flex-col items-center mx-auto'>
      <h1>Horizontal scroll</h1>
      <HorizontalScrollExample />

      <h1>Select</h1>
      <Select id="test" className='min-w-32' optionList={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option asjdksajdlksajdk', value: 'option4' },
      ]} />
    </div>
  )
}

export default App
