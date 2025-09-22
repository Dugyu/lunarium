import './App.css';
import { StudioFrame } from '@/components/studio-frame';

function App() {
  return (
    <div className='text-black flex h-screen leading-normal text-center flex-col'>
      <div className='w-full flex flex-row items-end h-32 gap-x-8 justify-center'>
        <h1 className='text-5xl font-normal'>L.U.N.A</h1>
        <p className='text-start font-light -translate-y-[2px]'>
          <i>
            Lynx UI New Aesthetics
          </i>
        </p>
      </div>
      <div className='w-full flex flex-1 justify-center items-center'>
        <div className='w-full h-2/3 flex justify-center items-center overflow-hidden'>
          <StudioFrame />
        </div>
      </div>
    </div>
  );
}

export default App;
