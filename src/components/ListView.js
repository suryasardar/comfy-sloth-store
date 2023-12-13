import React from 'react'
import styled ,{ keyframes }from 'styled-components'
import { useState, useEffect } from 'react';
import { formatPrice } from '../utils/helpers'
import heroBcg2 from '../assets/product-2.jpeg'
import { Link } from 'react-router-dom'
 

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

const LoadingAnimation = styled.div`
  --background: #62abff;
  --front-color: #000;
  --back-color: #c3c8de;
  --text-color: #414856;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #wifi-loader {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg circle {
      position: absolute;
      fill: none;
      stroke-width: 4px;  /* Adjusted stroke width */
      stroke-linecap: round;
      stroke-linejoin: round;
      transform: rotate(-90deg);
      transform-origin: center;
    }

    svg circle.back {
      stroke: var(--back-color);
    }

    svg circle.front {
      stroke: var(--front-color);
    }

    svg.circle-outer {
      circle {
        stroke-dasharray: 301.5929;
        stroke-dashoffset: 0;
        animation: circle-outer 1.5s ease-in-out infinite;
      }
    }

    svg.circle-middle {
      height: 100px;
      width: 100px;

      circle {
        stroke-dasharray: 191.0895;
        stroke-dashoffset: 0;
        animation: circle-middle 1.5s ease-in-out infinite;
      }
    }

    svg.circle-inner {
      height: 50px;
      width: 50px;

      circle {
        stroke-dasharray: 125.6637;
        stroke-dashoffset: 0;
        animation: circle-inner 1.5s ease-in-out infinite;
      }
    }

    .text {
      position: absolute;
      bottom: -60px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: lowercase;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.2px;

      &::before,
      &::after {
        content: attr(data-text);
      }

      &::before {
        color: var(--text-color);
      }

      &::after {
        color: var(--front-color);
        animation: text-animation 3.6s ease-in-out infinite;
        position: absolute;
        left: 0;
      }
    }
  }

  @keyframes circle-outer {
    0% {
      stroke-dashoffset: 301.5929;
    }

    50% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: 301.5929;
    }
  }

  @keyframes circle-middle {
    0% {
      stroke-dashoffset: 191.0895;
    }

    50% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: 191.0895;
    }
  }

  @keyframes circle-inner {
    0% {
      stroke-dashoffset: 125.6637;
    }

    50% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: 125.6637;
    }
  }

  @keyframes text-animation {
    0%, 100% {
      clip-path: inset(0 100% 0 0);
    }

    50% {
      clip-path: inset(0);
    }
  }
`;



const ListView = ({ products, images }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an asynchronous operation, e.g., fetching product details
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Use an empty dependency array to run the effect once on mount

  return (
    <Wrapper>
      {loading ? (
        <LoadingAnimation>
         <div id="wifi-loader">
  <svg viewBox="0 0 86 86" class="circle-outer">
    <circle r="40" cy="43" cx="43" class="back"></circle>
    <circle r="40" cy="43" cx="43" class="front"></circle>
    <circle r="40" cy="43" cx="43" class="new"></circle>
  </svg>
  <svg viewBox="0 0 60 60" class="circle-middle">
    <circle r="27" cy="30" cx="30" class="back"></circle>
    <circle r="27" cy="30" cx="30" class="front"></circle>
  </svg>
  <svg viewBox="0 0 34 34" class="circle-inner">
    <circle r="14" cy="17" cx="17" class="back"></circle>
    <circle r="14" cy="17" cx="17" class="front"></circle>
  </svg>
  <div data-text="Searching" class="text"></div>
</div>

        </LoadingAnimation>
      ) : (
        products.map((product) => {
          const { id, name, price, description } = product;
          const productImage = images[id % images.length];

          return (
            <article key={id}>
              <img src={productImage} alt={name} />
              <div>
                <h4>{name}</h4>
                <h5 className='price'>{formatPrice(price)}</h5>
                <p>{description.substring(0, 150)}...</p>
                <Link to={`/products/${id}`} className='btn'>
                  Details
                </Link>
              </div>
            </article>
          );
        })
      )}
    </Wrapper>
  );
};

export default ListView;