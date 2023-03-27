import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PostImage01 from '../images/blog-post-01.jpg';
import NewsImage01 from '../images/news-01.jpg';
import NewsImage02 from '../images/news-02.jpg';
import NewsImage03 from '../images/news-03.jpg';
import NewsImage04 from '../images/news-04.jpg';
import NewsImage05 from '../images/news-05.jpg';
import NewsImage06 from '../images/news-06.jpg';
import NewsImage07 from '../images/news-07.jpg';
import NewsImage08 from '../images/news-08.jpg';
import NewsImage09 from '../images/news-09.jpg';
import NewsAuthor01 from '../images/news-author-01.jpg';
import NewsAuthor02 from '../images/news-author-02.jpg';
import NewsAuthor03 from '../images/news-author-03.jpg';
import NewsAuthor04 from '../images/news-author-04.jpg';
import NewsAuthor05 from '../images/news-author-05.jpg';
import NewsAuthor06 from '../images/news-author-06.jpg';
import { clearMessage, setMessage } from '../redux/message';

import parse from 'html-react-parser'

function BlogList() {



  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message)
  //Get all blogs

  const [visible, setVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async () => {
    setVisible(true)
    try {
      await axios.get("https://plankton-app-q74hx.ondigitalocean.app/blog/findall").then(res => {
        setBlogs(res?.data)
        console.log("blogs :" + JSON.stringify(res?.data))
      }).catch((error) => {
        dispatch(setMessage((error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()))
      })
    } catch (error) {
      dispatch(setMessage((error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()))
    }
    setVisible(false)
  }


  useEffect(() => {
    getAllBlogs()
  }, [])
  useEffect(() => {
    dispatch(clearMessage())
  }, [])
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/*  Page header */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1" data-aos="fade-up">Refreshing news for developers</h1>
          </div>

          {/*  Featured article */}


          {/*  Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">

            {/*  Section title */}
            {/* <h4 className="h4 pb-6 mb-10 border-b border-gray-700" data-aos="fade-up">Latest articles</h4> */}

            {/*  Articles container */}
            <div className="grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">


              {visible ? <p>Loading...</p> : <>{blogs.map((blog, idx) => {
                return <article className="flex flex-col h-full" key={idx} data-aos="fade-up">
                  <header>
                    <Link to={`/blog-details/${blog?.id}`} className="block mb-6">
                      <figure className="relative h-0 pb-9/16 overflow-hidden rounded-sm">
                        <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={blog.BlogPicture[blog.BlogPicture.length - 1]?.pictureUrl} width="352" height="198" alt="News 01" />
                      </figure>
                    </Link>
                    <div className="mb-3">
                      <ul className="flex flex-wrap text-xs font-medium -m-1">
                        <li className="m-1">
                          <Link to="#" className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-orange-600 hover:bg-orange-700 transition duration-150 ease-in-out">AI</Link>
                        </li>

                      </ul>
                    </div>
                    <h3 className="h4 mb-2">
                      <Link to="/blog-post" className="hover:text-gray-100 transition duration-150 ease-in-out">{blog?.title}</Link>
                    </h3>
                  </header>
                  <div className='truncate max-h-12'><p className="text-lg  text-gray-400 grow">{blog?.content && parse((blog?.content))}</p></div>


                </article>
              })}</>}

              {/*  1st article */}


            </div>

          </div>

          {/*  Pagination */}
          {/* <nav className="flex justify-center pt-16" role="navigation" aria-label="Pagination Navigation">
            <ul className="inline-flex flex-wrap font-medium text-sm -m-1">
              <li className="m-1">
                <span className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-4 rounded-full text-gray-500">Prev</span>
              </li>
              <li className="m-1">
                <Link to="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-orange-600 transition-colors duration-150 ease-in-out">1</Link>
              </li>
              <li className="m-1">
                <Link to="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-orange-600 transition-colors duration-150 ease-in-out">2</Link>
              </li>
              <li className="m-1">
                <Link to="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-orange-600 transition-colors duration-150 ease-in-out">3</Link>
              </li>
              <li className="m-1">
                <span className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-500">...</span>
              </li>
              <li className="m-1">
                <Link to="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-orange-600 transition-colors duration-150 ease-in-out">12</Link>
              </li>
              <li className="m-1">
                <Link to="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-4 rounded-full text-gray-300 hover:bg-orange-600 transition-colors duration-150 ease-in-out">Next</Link>
              </li>
            </ul>
          </nav> */}

        </div>
      </div>
    </section>
  );
}

export default BlogList;