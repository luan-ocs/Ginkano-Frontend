import { PuffLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div
      className='h-screen w-screen flex justify-center items-center'
      data-testid='loader'
    >
      <PuffLoader color='#6D28D9' />
    </div>
  );
};
