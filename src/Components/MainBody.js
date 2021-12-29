import classes from './MainBody.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from './UI/LoadingSpinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MainBody = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos'
      );

      if (!response.ok) {
        throw new Error('Something Went Wrong! Please try again later.');
      }

      const responseData = await response.json();

      const loadedCards = [];
      for (const key in responseData) {
        loadedCards.push({
          key: key,
          id: responseData[key].id,
          url: responseData[key].url,
          title: responseData[key].title,
        });
      }
      setCards(loadedCards);
      setisLoading(false);
    };

    fetchCards().catch((error) => {
      setisLoading(false);
      sethttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <LoadingSpinner className={classes.loading} />
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.error}>{httpError}</p>
      </section>
    );
  }

  const cardsList = cards.map((card) => (
    <ul key={card.key} className={classes['d_card']}>
      <LazyLoadImage
        effect="blur"
        src={card.url}
        alt="alt"
        width="100%"
        height="auto"
      />
      <li className={classes.content}>
        <h2 className={classes.heading}>{card.id}</h2>
        <p className={classes['data-content']}>{card.title}</p>
      </li>
    </ul>
  ));

  return <main className={classes['page-content']}>{cardsList}</main>;
};

export default MainBody;
