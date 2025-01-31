import { useNavigate } from "react-router";
import Product from "../Products/Product";
import BannerContainer from "./BannerContainer";
import "./home.css";
import Button from "../common/Button";
const Home = () => {
    const navigate = useNavigate()
  return (
    <main>
      <BannerContainer imgPath="../../../assets/images/banner.avif">
        <div className="banner banner-1">
          <div>Quality applications and gadgets</div>
          <div>Smart solutions for everyday convenience</div>
          <Button title={'Shop Now'} link="/products"/>
        </div>
      </BannerContainer>
      <BannerContainer title={"TRENDING NOW"} btnTitle={"discover more"} btnLink="/products" hasBannerFooter={false}>
        <div className="product-row">
          <Product link='/products/speaker' image={'speaker.avif'} description={'360 Mini Portable Speaker'} showAddToCart={false} cost={'$100.00'}/>
          <Product link='/products/canva' image={'canva.avif'} description={'Turn5 Portable Bluetooth Speaker With Handle'} showAddToCart={false} cost={'$160.00'}/>
          <Product link='/products/phone' image={'phone.avif'} description={'OVE Light Space 5G Smartphone, 128GB'} showAddToCart={false} cost={'$750.00'}/>
          <Product link='/products/buds' image={'buds.avif'} description={'Space Buds True Wireless Earbud Headphones'} showAddToCart={false} cost={'$150.00'}/>
        </div>
      </BannerContainer>
      
      <BannerContainer imgPath="../../../assets/images/Smartwatch-02-Header.avif">
        <div className="banner banner-3">
          <div>10% off all smart watches with every purchase</div>
          <div>Explore limited time offers</div>
          <Button title={'Shop Now'} link="/products"/>
        </div>
      </BannerContainer>
      <BannerContainer title={"SHOP BY CATEGORY"} btnTitle={"discover more"} btnLink="/products" imgPath="../../../assets/images/banner-speaker.avif">
          <div className="banner banner-4">
            <ul onClick={(e)=>{navigate(e.target.dataset.link ?? '/')}}>
                <li data-link='/products/speakers'>SPEAKERS & HEADPHONES</li>
                <li data-link='/products/home-appliances'>HOME APPLIANCES</li>
                <li data-link='/products/phones'>SMART PHONES & WATCHES</li>
            </ul>
          </div>
      </BannerContainer>
    </main>
  );
};
export default Home;
