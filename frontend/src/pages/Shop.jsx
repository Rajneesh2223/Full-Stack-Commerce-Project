import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'

import NewCollections from '../components/NewCollection/NewCollection'
import Offers from '../components/Offers/Offers'
import Newsletter from '../components/Newsletter/Newsletter'


const Shop = () => {
  return (
    <div>
    <Hero/>
    <Popular/>
    <Offers/>
    <NewCollections/>
    <Newsletter/>
    </div>
  )
}

export default Shop