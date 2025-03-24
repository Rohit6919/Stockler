import React from 'react'
import dashboardsvg from "../assets/images/dashboardsvg.svg"
import image from "../assets/images/image.png"
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
      <section >
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              Stockler : Track smart, trade smarter
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-white">
              With Stockler, track your favorite stocks and stay updated on market movements to make smarter trading decisions.
            </p>
            <Link to="/signup" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex md:hidden">
            <img src={dashboardsvg} alt="mockup" />
          </div>
        </div>

        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          {/* Image Container with white border */}
          <div className="relative border-4 border-white p-2 bg-white dark:bg-gray-800">
            <img className="w-full dark:hidden" src={image} alt="dashboard image" />
            <img className="w-full hidden dark:block" src={image} alt="dashboard image" />
          </div>

          {/* Content Section */}
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              If you're new to stock investment, check out EliteProWealth for low-risk, high-return opportunities.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Whether you're just starting or looking for solid investment options, EliteProWealth offers valuable insights and strategies to guide your journey.
            </p>

            <a href="https://eliteprowealth.com" className="inline-flex items-center text-black focus:ring-4 focus:ring-primary-300 font-medium rounded-lg bg-white text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
              Check Out
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;
