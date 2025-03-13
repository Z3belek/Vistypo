import FontPreviewClient from '@/components/FontPreviewClient'
import Footer from '@/components/Footer'
import GithubBtn from '@/components/GithubBtn'
import Header from '@/components/Header'
import React from 'react'

const Home = () => {
  return (
    <>
      <Header />
      <main className="relative flex flex-col gap-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className='fixed top-1/6 -right-34 transition-all ease-in-out hover:right-0'>
          <GithubBtn />
        </div>
        <FontPreviewClient />
      </main>
      <Footer />
    </>
  )
}

export default Home