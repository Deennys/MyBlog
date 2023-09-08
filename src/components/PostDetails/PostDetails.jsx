import styles from './PostDetails.module.css';

import { Link } from 'react-router-dom';

export default function PostDetails({post}) {
  return (
    <div>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>
        <div>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`posts/post#${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}
