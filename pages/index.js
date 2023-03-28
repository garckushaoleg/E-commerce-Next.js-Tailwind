import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Product from '../components/Product';
import { initMongoose } from '../lib/mongoose';
import { findAllProducts } from './api/products';
import Layout from '../components/Layout';


const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }) {

  const [ phrase, setPhrase ] = useState('');

  const categories = [ ...new Set(products.map(product => product.category))];

  if (phrase) {
    products = products.filter( item => item.name.toLowerCase().includes(phrase))
  }

  return (
    <Layout>
      <input value={ phrase } onChange={ e => setPhrase(e.target.value) } type="text" />
    
      <div>

      { categories.map(category => (
        <div key={ category }>
          { products.find(p => p.category === category) && (
            <div key={category}>
              <h2 className="text-2xl capitalize">{ category }</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                { products.filter(product => product.category === category).map(product => (
                  <div key={ product._id } className="px-5 snap-start">
                    <Product { ...product } />
                  </div>
                )) }
              </div>
            </div>
          )}
        </div>
      )) }
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose();

  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
