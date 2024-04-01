import './../assets/styles/footer.css'
import { FaEnvelope, FaFacebook, FaFacebookF, FaGooglePlusG, FaInstagram, FaPaperPlane, FaPhoenixFramework, FaPhone, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div className="footer-area">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h4 className="footer-heading">IMCOTraders</h4>
                <div className="footer-underline" />
                <p>
                  IMCOTraders is an Ecommerce platform that provides a wide range of products to its customers. We are here to provide you with the best quality products at the best prices.
                </p>
              </div>
              <div className="col-md-3">
                <h4 className="footer-heading">Quick Links</h4>
                <div className="footer-underline" />
                <div className="mb-2"><a href className="text-white">Home</a></div>
                <div className="mb-2"><a href className="text-white">About Us</a></div>
                <div className="mb-2"><a href className="text-white">Contact Us</a></div>
                <div className="mb-2"><a href className="text-white">Blogs</a></div>
                {/* <div className="mb-2"><a href className="text-white">Sitemaps</a></div> */}
              </div>
              <div className="col-md-3">
                <h4 className="footer-heading">Shop Now</h4>
                <div className="footer-underline" />
                <div className="mb-2"><a href className="text-white">Collections</a></div>
                <div className="mb-2"><a href className="text-white">Trending Products</a></div>
                <div className="mb-2"><a href className="text-white">New Arrivals Products</a></div>
                <div className="mb-2"><a href className="text-white">Featured Products</a></div>
                <div className="mb-2"><a href className="text-white">Cart</a></div>
              </div>
              <div className="col-md-3">
                <h4 className="footer-heading">Reach Us</h4>
                <div className="footer-underline" />
                <div className="mb-2">
                  <p>
                    <i className="fa fa-map-marker" />
                    zaida swabi kpk, Pakistan
                  </p>
                </div>
                <div className="mb-2">
                  <a href className="text-white">
                    <FaPhone /> +92 314 3088544
                  </a>
                </div>
                <div className="mb-2">
                  <a href className="text-white">
                    <FaEnvelope /> Imco@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <p className> © {currentYear} - IMCOTraders - Ecommerce. All rights reserved.</p>
              </div>
              <div className="col-md-4">
                <div className="social-media">
                  Get Connected:
                  <a href><FaFacebook /></a>
                  <a href><FaTwitter /></a>
                  <a href><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </footer>

  );
};
export default Footer;
