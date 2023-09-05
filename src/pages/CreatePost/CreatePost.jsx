import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    const {user} = useAuthValue()

    const {insertDocument, response} = useInsertDocument('posts')

    function handleSubmit(e) {
        e.preventDefault();
        setFormError('');

        // validate image URL

        // criar o array de tags

        // checar todos os valores

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createdBy: user.displayName
        })

    }


    return (
        <div className={styles.create_post}>
            <h2>Create post</h2>
            <p>Write about whatever you want and share your knowledge</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="think of a good title..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Image URL:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image in your post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Content:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insert the content of the post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insert the tags separated by a comma"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                <button className="btn" disabled={response.loading}>{response.loading ? 'Wait...' : 'Register'}</button>
                {response.error && <p className="error">{response.error}</p>}
            </form>
        </div>
    )
}
