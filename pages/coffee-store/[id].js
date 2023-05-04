import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import cls from "classnames";

import coffeeStoresData from "../../data/coffee-stores.json";

import styles from "../../styles/Cofee-store.module.css";

import { fetchCoffeeStores } from "../../lib/coffee-stores";















export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  // console.log("params", params);

  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}


const CoffeeStore = (props) =>{
    // console.log(props)
    const router = useRouter();
    // console.log(router.query);
    const {name , imgUrl , location ,websiteUrl, address, neighbourhood } = props.coffeeStore;
    // console.log(props.coffeeStore);
const handleUpvoteButton = () =>{
  console.log("Hiii I am upvoted")
}

const myLoader = ({ src, width, quality }) => {
  return src ? `${src}?w=${width}&q=${quality || 75}` : 'http://localhost:3000/static/ZZ5H.gif'
}

    return <div className={styles.layout}> 
     
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}></div>
            <Link href="/">Back to home</Link>
          <div className={styles.nameWrapper}>
            <h4  className={styles.name}>{name}</h4>
          </div>
            <div className={styles.storeImgWrapper}>            
              <Image placeholder={myLoader} className={styles.storeImg} src={imgUrl  ||   "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} alt={name} width={600} height={360}></Image>
            </div>

        </div>
        <div className={cls("glass",styles.col2)}>
          <div className={styles.iconWrapper}>
              {/* <Image src="" width={24} height={24}></Image> */}
              <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
              {/* <Image src="" width={24} height={24}></Image> */}
              <p className={styles.text}>{location.formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
              {/* <Image src="" width={24} height={24}></Image> */}
              <p className={styles.text}>{1}</p>
          </div>
            
            <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote !</button>
        </div>
        </div>
        </div>
}

export default CoffeeStore