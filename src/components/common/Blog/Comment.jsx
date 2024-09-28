import PropTypes from "prop-types";

let heart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
  </svg>
);
const replyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
  </svg>
);

function LikeButton({ likes }) {
  if (likes > 0) {
    return (
      <button style={{ color: "red" }}>
        {heart}
        <sup>{likes}</sup>
      </button>
    );
  } else {
    return (
      <button>
        {heart}
        <sup>{likes}</sup>
      </button>
    );
  }
}

export default function Comment({ name, date, text, likes }) {
  let dateObject = new Date(date);
  return (
    <div className="comment">
      <div className="comment-head">
        <span style={{ fontWeight: 500 }}>🗨️ {name}</span>
        <i style={{ color: "darkgrey" }}>{dateObject.toLocaleDateString()}</i>
      </div>
      <div className="comment-body">{text}</div>

      <div className="comment-interactions" style={{ marginTop: "0.5rem" }}>
        <LikeButton likes={likes} />
        <button>{replyIcon}</button>
      </div>
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number,
};
LikeButton.propTypes = {
  likes: PropTypes.number,
};