import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
function Banner() {
   return (
      <div className="relative">
         <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
         <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}>
            <div>
               <img
                  loading="lazy"
                  src="https://images-eu.ssl-images-amazon.com/images/G/02/kindle/content/GTM/Editorial/0504-AMZN-GNBC-GatewayHero-1500x600_v5._CB669739807_.jpg"
               />
            </div>
            <div>
               <img
                  loading="lazy"
                  src="https://images-eu.ssl-images-amazon.com/images/G/02/kindle/content/GTM/Editorial/0504-AMZN-GNBC-GatewayHero-1500x600_v5._CB669739807_.jpg"
               />
            </div>
            <div>
               <img
                  loading="lazy"
                  src="https://images-eu.ssl-images-amazon.com/images/G/02/kindle/content/GTM/Editorial/0504-AMZN-GNBC-GatewayHero-1500x600_v5._CB669739807_.jpg"
               />
            </div>
         </Carousel>
      </div>
   );
}

export default Banner;
