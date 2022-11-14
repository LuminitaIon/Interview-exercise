import React from 'react';
import './App.css';

import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`{
  allPosts(count:10) {
    createdAt,
    title
  }
}`;

function App() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if(data) {
    console.log(data.allPosts)
  }

  if (loading) return <p>Loading ...</p>;
  if(error) return <p> ServerError occurerd</p>

  return (
    <div className="App">
      <h1> Posts Statistics </h1>
    </div>
  );
}

export default App;
