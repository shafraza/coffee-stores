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



const coffee = () =>{
    const router = useRouter();
    console.log(router.query);

    return <div>        Page {router.query.id}   </div>
}

export default coffee