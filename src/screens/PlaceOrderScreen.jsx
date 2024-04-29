import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { useProfileMutation } from '../slices/usersApiSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (userInfo && userInfo.points >= 200) {
      const pointsDiscount = 200;
      setDiscountPrice(pointsDiscount);
    } else {
      setDiscountPrice(0);
    }
  }, [userInfo]);

  const dispatch = useDispatch();


  const placeOrderHandler = async () => {
    try {
      let pointsToDeduct = 0;
      if (userInfo && userInfo.points >= 200) {
        pointsToDeduct = 200;
      } else if (userInfo && userInfo.points > 0) {
        pointsToDeduct = userInfo.points;
      }

      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        discountPrice: pointsToDeduct, // Add discount price to order
        totalPrice: cart.totalPrice - pointsToDeduct, // Deduct discount from total price
      }).unwrap();
      console.log("sfsduhfkjsd:", userInfo.points - pointsToDeduct)
      if (pointsToDeduct > 0) {
        await updateProfile({
          _id: userInfo._id,
          points: userInfo.points - pointsToDeduct,
        }).unwrap();
      }


      // // Dispatch action to update user points
      // if (pointsToDeduct > 0) {
      //   dispatch(updateUserPoints(userInfo.points - pointsToDeduct));
      // }

      toast.success('Order placed successfully', {
        theme: 'colored',
      });
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };


  // const placeOrderHandler = async () => {
  //   try {
  //     const res = await createOrder({
  //       orderItems: cart.cartItems,
  //       shippingAddress: cart.shippingAddress,
  //       paymentMethod: cart.paymentMethod,
  //       itemsPrice: cart.itemsPrice,
  //       shippingPrice: cart.shippingPrice,
  //       discountPrice: discountPrice, // Add discount price to order
  //       totalPrice: cart.totalPrice - discountPrice, // Deduct discount from total price
  //     }).unwrap();
  //     toast.success('Order placed successfully', {
  //       theme: 'colored',
  //     });
  //     dispatch(clearCartItems());
  //     navigate(`/order/${res._id}`);
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x PKR {item.price} = PKR {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>PKR {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>PKR {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Discount</Col>
                  <Col>PKR {discountPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>PKR {cart.totalPrice - discountPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;


// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
// import CheckoutSteps from '../components/CheckoutSteps';
// import Loader from '../components/Loader';
// import { useCreateOrderMutation } from '../slices/ordersApiSlice';
// import { clearCartItems } from '../slices/cartSlice';

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);
//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();
//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate('/shipping');
//     } else if (!cart.paymentMethod) {
//       navigate('/payment');
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const dispatch = useDispatch();
//   const placeOrderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       toast.success('Order placed successfully', {
//         theme: 'colored',
//       });
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err);
//     }
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Address:</strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
//                 {cart.shippingAddress.postalCode},{' '}
//                 {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <strong>Method: </strong>
//               {cart.paymentMethod}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message>Your cart is empty</Message>
//               ) : (
//                 <ListGroup variant='flush'>
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x PKR {item.price} = PKR {item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>PKR {cart.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>PKR {cart.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {/* <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>PKR {cart.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item> */}
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>PKR {cart.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 {error && <Message variant='danger'>{error}</Message>}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Button
//                   type='button'
//                   className='btn-block'
//                   disabled={cart.cartItems === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </Button>
//                 {isLoading && <Loader />}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default PlaceOrderScreen;
