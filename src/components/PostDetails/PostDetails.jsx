import styles from './PostDetails.module.css';

import { Link } from 'react-router-dom';

export default function PostDetails({post}) {
  console.log(post.id)
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}
