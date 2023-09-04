import { Link } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.about}>
        <h2>About My <span>Blog</span></h2>
        <p>This project consists of a blog made with React on the Front-end and Firebase on the Back-end</p>
        <Link to="/post/create" className='btn'>
          Create Post
        </Link>
    </div>
  )
}
