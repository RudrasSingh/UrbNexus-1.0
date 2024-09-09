import React from "react";
import "./forum.css"; // Add your CSS here

const ForumPage = () => {
  const posts = [
    {
      id: 1,
      user: "TheRight",
      role: "Silver Member",
      postTime: "17 mins 32 secs ago",
      content:
        "A good buy opportunity for long-term investors. Do your own research before investing as this is not an investment advice.",
    },
    {
      id: 2,
      user: "nnomg",
      role: "New Member",
      postTime: "37 mins 50 secs ago",
      content:
        "tannu n mannu hi chal raha hai iss forum par . stock toh buri tarah pitt raha hai so all of you in dono ko hi enjoy karo.",
    },
    {
      id: 3,
      user: "nagasuda",
      role: "New Member",
      postTime: "1 hour 20 mins ago",
      content: "28th September is the due date for Dividend payment as advised to NSE by IRFC.",
    },
  ];

  return (
    <div className="forum-page">
      <div className="comment-box">
        <input type="text" placeholder="Post your first comment here" />
        <button>Post</button>
      </div>
      <div className="topics">
        <div className="filters">
          <button>Latest</button>
          <button>Most Debated</button>
          <button>Top Borders</button>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-category">Indian Railway</span>
              <button className="follow-button">Follow</button>
            </div>
            <div className="user-info">
              <span className="user-name">{post.user}</span>
              <span className="user-role">{post.role}</span>
              <span className="post-time">{post.postTime}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button className="reply-button">Reply</button>
              <button className="share-button">Share</button>
              <button className="like-button">❤️</button>
              <button className="follow-post-button">Follow Post</button>
              <button className="offensive-button">Offensive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
