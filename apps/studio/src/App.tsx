import './App.css';
import { Choreography } from '@/components/choreography/';
// import { Studio } from '@/components/studio';

function App() {
  return (
    <div className='relative text-black flex h-screen w-screen overflow-hidden leading-normal text-center flex-col'>
      <div className='w-full flex-none flex flex-row items-end h-32 gap-x-8 justify-center'>
        <h1 className='text-5xl font-normal'>L.U.N.A</h1>
        <p className='text-start font-light -translate-y-[2px]'>
          <i>
            Lynx UI New Aesthetics
          </i>
        </p>
      </div>
      <div className='relative w-full flex flex-1 justify-center items-center min-h-0'>
        <div className='relative w-full h-2/3 flex justify-center items-center'>
          <Choreography />
        </div>
      </div>
    </div>
  );
}

export default App;
