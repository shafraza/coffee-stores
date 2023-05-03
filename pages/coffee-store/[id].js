import { useRouter } from 'next/router'
import coffeeStoresData from "../../data/coffee-stores.json"

export async function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore) => ({
      params: { id: coffeeStore.id.toString() },
    }));
    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    };
  }

  export async function getStaticProps(context) {
    const { params } = context;
    const coffeeStore = coffeeStoresData.find(
      (coffeeStore) => coffeeStore.id.toString() === params.id
    );
    return {
      props: {
        coffeeStore,
      }, // will be passed to the page component as props
    };
  }



const coffee = (props) =>{
    console.log(props)
    const router = useRouter();
    console.log(router.query);

    return <div> 
            <h4>{props.coffeeStore.name}</h4>
            <h4>{props.coffeeStore.websiteUrl}</h4>
            <h4>{props.coffeeStore.address}</h4>
            <h4>{props.coffeeStore.neighbourhood}</h4>
         </div>
}

export default coffee