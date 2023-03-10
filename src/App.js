import React from 'react';
import axios from 'axios';
import './App.css'

class PostList extends React.Component {
  state = {
    posts: [],
    error: null
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  handleAddPost = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', { title: 'New Post', body: 'Lorem ipsum' })
      .then(response => {
        const newPost = response.data;
        this.setState(prevState => ({ posts: [...prevState.posts, newPost] }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  handleUpdatePost = postId => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, { title: 'Updated Post', body: 'Dolor sit amet' })
      .then(response => {
        const updatedPost = response.data;
        this.setState(prevState => ({
          posts: prevState.posts.map(post => post.id === postId ? updatedPost : post)
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  handleDeletePost = postId => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        this.setState(prevState => ({
          posts: prevState.posts.filter(post => post.id !== postId)
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { posts, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <button onClick={this.handleAddPost}>Add Post</button>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                {post.title}
                <button onClick={() => this.handleUpdatePost(post.id)}>Update</button>
                <button onClick={() => this.handleDeletePost(post.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;
