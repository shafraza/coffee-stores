import styles from "../styles/Banner.module.css";

import { useEffect, useState } from 'react';



const Banner = (props) => {



  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);




  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee stores!</p>
      <div className={styles.buttonWrapper}>
        {/* <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button> */}
      </div>
    </div>
  );
};

export default Banner;