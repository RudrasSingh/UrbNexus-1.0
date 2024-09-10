/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import "./forum.css"; // Add your CSS here

const ForumPage = () => {
  const initialPosts = [
    {
      id: 1,
      user: "TheRight",
      role: "Silver Member",
      postTime: "17 mins 32 secs ago",
      content:
        "A good buy opportunity for long-term investors. Do your own research before investing as this is not an investment advice.",
      likes: 0,
      likedByUser: false,
      isFollowed: false, // To handle following/unfollowing
      isPostFollowed: false, // To handle following/unfollowing posts
      isOffensive: false, // To flag offensive posts
    },
    {
      id: 2,
      user: "nnomg",
      role: "New Member",
      postTime: "37 mins 50 secs ago",
      content:
        "tannu n mannu hi chal raha hai iss forum par. Stock toh buri tarah pitt raha hai so all of you in dono ko hi enjoy karo.",
      likes: 0,
      likedByUser: false,
      isFollowed: false,
      isPostFollowed: false,
      isOffensive: false,
    },
    {
      id: 3,
      user: "nagasuda",
      role: "New Member",
      postTime: "1 hour 20 mins ago",
      content: "28th September is the due date for Dividend payment as advised to NSE by IRFC.",
      likes: 0,
      likedByUser: false,
      isFollowed: false,
      isPostFollowed: false,
      isOffensive: false,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");

  // Open reply modal
  const handleReplyClick = (post) => {
    setCurrentPost(post);
    setShowReplyModal(true);
  };

  // Open post modal
  const handlePostClick = () => {
    setShowPostModal(true);
  };

  // Close reply modal
  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setCurrentPost(null);
    setReplyContent("");
  };

  // Close post modal
  const handleClosePostModal = () => {
    setShowPostModal(false);
    setNewPostTitle("");
    setNewPostDescription("");
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (replyContent) {
      console.log("Reply to post:", currentPost.id, "Reply:", replyContent);
      handleCloseReplyModal();
    }
  };

  // Handle new post submission
  const handlePostSubmit = () => {
    if (newPostTitle && newPostDescription) {
      const newPost = {
        id: posts.length + 1,
        user: "New User",
        role: "New Member",
        postTime: "Just now",
        content: newPostDescription,
        likes: 0,
        likedByUser: false,
        isFollowed: false,
        isPostFollowed: false,
        isOffensive: false,
      };

      setPosts([newPost, ...posts]);
      handleClosePostModal();
    }
  };

  // Handle like toggle
  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedLikeStatus = !post.likedByUser;
          return {
            ...post,
            likes: updatedLikeStatus ? post.likes + 1 : post.likes - 1,
            likedByUser: updatedLikeStatus,
          };
        }
        return post;
      })
    );
  };

  // Handle follow/unfollow user
  const handleFollowClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isFollowed: !post.isFollowed,
          };
        }
        return post;
      })
    );
  };

  // Handle follow/unfollow post
  const handleFollowPostClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isPostFollowed: !post.isPostFollowed,
          };
        }
        return post;
      })
    );
  };

  // Handle flag as offensive
  const handleOffensiveClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isOffensive: !post.isOffensive,
          };
        }
        return post;
      })
    );
  };

  // Handle share button
  const handleShareClick = (postContent) => {
    navigator.clipboard.writeText(postContent);
    alert("Post content copied to clipboard!");
  };

  return (
    <div className="forum-page">
      {/* New Post Button */}
      <div className="comment-box">
        <input
          type="text"
          placeholder="Post your first comment here"
          onClick={handlePostClick}
          readOnly
        />
        <button onClick={handlePostClick}>Post</button>
      </div>

      {/* Post List */}
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
              <button className="follow-button" onClick={() => handleFollowClick(post.id)}>
                {post.isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="user-info">
              <span className="user-name">{post.user}</span>
              <span className="user-role">{post.role}</span>
              <span className="post-time">{post.postTime}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button className="reply-button" onClick={() => handleReplyClick(post)}>
                Reply
              </button>
              <button className="share-button" onClick={() => handleShareClick(post.content)}>
                Share
              </button>
              <button
                className={`like-button ${post.likedByUser ? "liked" : ""}`}
                onClick={() => handleLikeClick(post.id)}
              >
                ❤️ {post.likes}
              </button>
              <button className="follow-post-button" onClick={() => handleFollowPostClick(post.id)}>
                {post.isPostFollowed ? "Unfollow Post" : "Follow Post"}
              </button>
              <button className="offensive-button" onClick={() => handleOffensiveClick(post.id)}>
                {post.isOffensive ? "Flagged" : "Offensive"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="reply-modal">
          <div className="modal-content">
            <h3>Reply to {currentPost.user}'s post</h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply here..."
              rows="5"
            />
            <div className="modal-actions">
              <button onClick={handleReplySubmit}>Submit Reply</button>
              <button onClick={handleCloseReplyModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {showPostModal && (
        <div className="reply-modal">
          <div className="modal-content">
            <h3>Create a New Post</h3>
            <input
              className="post-title-input"
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post Title"
            />
            <textarea
              className="post-description-input"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
              placeholder="Post Description"
              rows="5"
            />
            <div className="modal-actions">
              <button onClick={handlePostSubmit}>Submit Post</button>
              <button onClick={handleClosePostModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
