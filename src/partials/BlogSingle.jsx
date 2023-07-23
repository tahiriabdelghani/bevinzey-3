import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


import defaultblog from '../images/defaultblog.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import parse from 'html-react-parser'
import { setMessage } from '../redux/message';

function BlogSingle() {
  const { id, name } = useParams();


  const [visible, setVisible] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  //Get blog details
  const [blog, setBlogData] = useState('')
  const getBlogData = async () => {
    setVisible(true)
    try {
      await axios.get("https://api.bevinzey.com/blog/" + Id).then(res => {

        setBlogData(res?.data)
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
    getBlogData()
  }, [])

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto">

            <article>

              <header className="mb-8">
                {/* Title and excerpt */}
                <div className="text-center md:text-left">
                  <h1 className="h1 mb-4" data-aos="fade-up">{blog.title}</h1>  </div>
                {/* Article meta */}
                <div className="md:flex md:items-center md:justify-between mt-3">

                  {/* Article tags */}
                  <div className="flex justify-center mt-4 md:mt-0" data-aos="fade-up" data-aos-delay="600">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <Link to="#" className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-orange-600 hover:bg-orange-700 transition duration-150 ease-in-out">AI</Link>
                      </li>

                    </ul>
                  </div>
                </div>
              </header>

              {/* Article image */}
              <figure className="mb-8 lg:-ml-32 lg:-mr-32" data-aos="fade-up" data-aos-delay="600">
                {blog.BlogPicture?.length > 0 ? <img className="w-full" src={blog?.BlogPicture[blog.BlogPicture.length - 1]?.pictureUrl} width="1024" height="576" alt="News single" /> :
                  <img className="w-full"
                    src={defaultblog}
                    width="1024" height="576" alt="News single" />

                }              </figure>

              {/* Article content */}
              <div className="text-lg text-gray-400">
                <p className="mb-8">
                  {blog?.content && parse(blog?.content)}
                </p>


              </div>

              {/* Article footer */}

            </article>

          </div>



        </div>
      </div>
    </section>
  );
}

export default BlogSingle;