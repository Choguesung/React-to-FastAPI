// React 컴포넌트에서 데이터를 가져오는 예제

import React, { useState, useEffect } from 'react';
import axios from "axios";

function MyComponent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
    axios.get('http://15.164.46.201/title').then((response) => {
      setData(response.data); // 선수 데이터를 상태에 저장
    });
  }, []);

  console.log(data)

  const handleCreatePost = async () => {
    try {
      // 요청 바디에 데이터를 담아 POST 요청 보내기
      const response = await axios.post('http://15.164.46.201/post', {
        title: title,
        content: content,
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  console.log(data)

  return (
    <div>
      {data ? (
        <p>서버에서 받은 데이터: {data.title}</p>
      ) : (
        <p>데이터를 로딩 중입니다...</p>
      )}

      <div>
        <h2>Create a New Post</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <br />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
}

export default MyComponent;
