import styles from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetails from "../../components/PostDetails/PostDetails";

export default function Home() {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts');

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className={styles.home}>
      <h1>Latest posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder="Or search by tags..." onChange={e => setQuery(e.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts?.map((post) => (
          <PostDetails post={post} key={post.id}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No posts found :(</p>
            <Link to='/posts/create' className="btn">Create first post</Link>
          </div>
        )}
      </div>
    </div>
  )
}
