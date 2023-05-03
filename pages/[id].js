import { useRouter } from 'next/router'
import Head from 'next/head'

const dynamicPage = () => {
     const router = useRouter();
     console.log(router.query);

     return <div>
        <Head>
        <title>{router.query.id}</title>
      </Head>
        Page {router.query.id}
        
        </div>


}

export default dynamicPage;