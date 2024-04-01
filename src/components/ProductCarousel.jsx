import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import image1 from '../assets/IMG-20240323-WA0006.jpg';
import image2 from '../assets/IMG-20240323-WA0008.jpg';
import image4 from '../assets/IMG-20240323-WA0010.jpg';
import image5 from '../assets/IMG-20240323-WA0013.jpg';
import image6 from '../assets/IMG-20240323-WA0024.jpg';
const ProductCarousel = () => {
  // const { data: products, isLoading, error } = useGetTopProductsQuery();

  // return isLoading ? null : error ? (
  //   <Message variant='danger'>{error?.data?.message || error.error}</Message>
  // ) : (
  return (
    <Carousel pause='hover' className='bg-primary mb-4'>
      <Carousel.Item>
        <Image src={image1} alt='First slide' fluid
          style={{
            width: '50%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={image2} alt='First slide' fluid
          style={{
            width: '50%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={image5} alt='First slide' fluid
          style={{
            width: '50%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={image4} alt='First slide' fluid
          style={{
            width: '50%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={image6} alt='First slide' fluid
          style={{
            width: '50%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Carousel.Item>

      {/* {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Image src={product.image} alt={product.name} fluid
            />
          <Carousel.Caption className='carousel-caption'>
            <h2 className='text-white text-right'>
              {product.name} (PKR {product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))} */}
    </Carousel>
  );
};

export default ProductCarousel;
