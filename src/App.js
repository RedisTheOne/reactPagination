import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import {useSpring, animated} from 'react-spring';
import Posts from './components/Posts'
import Pagination from './components/Pagination'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const h1Spring = useSpring({marginLeft: 0, from: {marginLeft: 10450}, delay: 500})

  const h2Spring = useSpring({opacity: 1, from: {opacity: 0}, delay: 1500})

  const h3Spring = useSpring({opacity: 1, from: {opacity: 0}, delay: 2500})

  useEffect(() => {
    const fetchPosts = async() => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const paginate = (num) => setCurrentPage(num)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className="App">
      <div className="animated">
        <animated.h1 style={h1Spring}>Made for fun</animated.h1>
        <animated.h3 style={h2Spring}>By The Best</animated.h3>
        <animated.h5 style={h3Spring}>Redus</animated.h5>
      </div>
      <div id="posts" className="mt-sm-5 container">
        <h1>Posts</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
