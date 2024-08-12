import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import LiveAuction from '../components/layouts/home-3/LiveAuction';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import SliderStyle3 from '../components/slider/SliderStyle3';
import { Blurhash } from 'react-blurhash';
import 'react-tabs/style/react-tabs.css';
import parse from 'html-react-parser';

const ItemDetails01 = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://web-production-1ab9.up.railway.app/api/experiences/${id}/with-reviews`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Ensure data is logged
        setItemData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const heroSliderData = itemData && itemData.cover_photos
    ? itemData.cover_photos.map((coverPhoto) => ({
        src: coverPhoto.image.cover_photos, // Correctly map to `src`
        blurhash: coverPhoto.blurhash, // Include Blurhash
      }))
    : [];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='item-details'>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <center>
                <div className="page-title-heading mg-bt-12">
                  <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-10">{itemData.experience.title}</h4>
                  <h1 className="heading text-center">
                    <Rating value={itemData.average_rating} color={'#f8e825'} />
                  </h1>
                </div>
              </center>
              <div className="breadcrumbs style2">
                <ul>
                  <li>Based on {itemData.reviews.length} reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SliderStyle3
        data={heroSliderData}
        renderImage={(src, blurhash) => (
          <div style={{ position: 'relative' }}>
            <Blurhash
              hash={blurhash}
              width={500}
              height={325}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            />
            <img
              src={src}
              alt="Cover"
              style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 2 }}
              onError={(e) => {
                console.error('Error loading image:', e);
                e.target.style.display = 'none'; // Hide broken images
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', src); // Confirm image loaded
              }}
            />
          </div>
        )}
      />

      <div className="tf-section tf-item-details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-center">
                <div className="sc-item-details">
                  <div>{parse(itemData.experience.body)}</div>
                  <br />
                  <center>
                    <Link target='__blank' to="https://wa.link/f1ufwx" className="sc-button loadmore style fl-button pri-3">
                      <span>Plan your adventure with us</span>
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveAuction data={itemData.reviews} />
      <Footer />
    </div>
  );
}

export default ItemDetails01;
