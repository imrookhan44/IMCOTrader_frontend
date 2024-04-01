import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      className='spinner__loader'
    ></Spinner>
  );
};

export default Loader;
