import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

export default function EditPost() {
    const { id } = useParams()
    const { document: post } = useFetchDocument('posts', id)

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tags?.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument('posts')

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setFormError('');

        // validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError('The image needs to be in URL format.')
        }

        // criar o array de tags
        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

        // checar todos os valores
        if (title || image || body || tagsArray) {
            setFormError('Please complete all fields');
        }

        if (formError) return;

        updateDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        navigate('/dashboard');
    }


    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editing post: {post.title}</h2>
                    <p>Change the post details as you wish</p>
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
                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
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
                        <button className="btn" disabled={response.loading}>{response.loading ? 'Wait...' : 'edit'}</button>
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}
