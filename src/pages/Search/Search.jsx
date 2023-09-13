import styles from './Search.module.css'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"

import PostDetails from "../../components/PostDetails/PostDetails";
import { Link } from "react-router-dom";

export default function Search() {
    const query = useQuery();
    const search = query.get('q')

    const { documents: posts } = useFetchDocuments('posts', search)
    console.log('posts: ', posts);
    

    return (
        <div className={styles.search_container}>
            <h2>search</h2>
            <div>
                {posts?.length === 0 && (
                    <div className={styles.noposts}>
                        <p>no posts found from your search...</p>
                        <Link to='/' className="btn btn-dark">Back</Link>
                    </div>
                )}
                {posts?.map((post) => (
                    <PostDetails post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}
