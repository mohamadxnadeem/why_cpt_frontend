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
import styled from 'styled-components';

const ItemDetailsContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #fff;
`;

const Section = styled.section`
  .flat-title-page {
    position: relative;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .themesflat-container {
      padding: 20px;
    }
  }
`;

const TitleHeading = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Breadcrumbs = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  padding: 20px;
  border-radius: 10px;
`;

const ItemDetailsContent = styled.div`
  text-align: center;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 20px auto;
  padding: 10px 20px;
  background: #f8e825;
  color: #000;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background: #e2d00b;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

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
        src: coverPhoto.image.cover_photos,
        blurhash: coverPhoto.blurhash,
      }))
    : [];

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <ItemDetailsContainer>
      <Header />
      <Section>
        <div className="flat-title-page inner">
          <div className="overlay"></div>
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-12">
                <TitleHeading>
                  <h4>{itemData.experience.title}</h4>
                  <h1>
                    <Rating value={itemData.average_rating} color={'#f8e825'} />
                  </h1>
                </TitleHeading>
                <Breadcrumbs>
                  <ul>
                    <li>Based on {itemData.reviews.length} reviews</li>
                  </ul>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SliderStyle3
        data={heroSliderData}
        renderImage={(src, blurhash) => (
          <SliderWrapper>
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
          </SliderWrapper>
        )}
      />

      <ItemDetailsContent>
        <div>{parse(itemData.experience.body)}</div>
        <br />
        <StyledLink target='__blank' to="https://wa.link/f1ufwx">
          Plan your adventure with us
        </StyledLink>
      </ItemDetailsContent>

      <LiveAuction data={itemData.reviews} />
      <Footer />
    </ItemDetailsContainer>
  );
}

export default ItemDetails01;
