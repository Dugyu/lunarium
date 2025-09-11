import './App.css';
import { StudioFrame } from '@/components/studio-frame';

function App() {
  return (
    <div className='text-black flex h-screen leading-normal text-center flex-col'>
      <div className='w-full flex flex-row items-end h-32 gap-x-8 justify-center'>
        <h1 className='text-5xl font-bold'>L.U.N.A</h1>
        <p className='text-xl opacity-50 text-start'>
          The experimental realm of{' '}
          <span className='text-xl font-medium'>
            <i>Lynx UI New Aesthetics</i>
          </span>
        </p>
      </div>
      <div className='w-full flex flex-1 justify-center items-center'>
        <div className='w-1/2 h-2/3 flex justify-center items-center overflow-hidden'>
          <StudioFrame />
        </div>
      </div>
    </div>
  );
}

export default App;
