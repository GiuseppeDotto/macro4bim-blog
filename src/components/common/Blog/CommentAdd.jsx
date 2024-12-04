export default function CommentAdd() {
  return (
    <div className="comment-add">
      <h4>New Comment</h4>
      <textarea name="text" id="" style={{ resize: "none" }}></textarea>
      <div>
        <input type="text" name="name" id="" placeholder="name *" required={true} />
        <input type="email" name="email" id="" placeholder="email *" required={true} />
        <button>Submit</button>
      </div>
      <small>The e-mail is used to notify you any interaction with your comment</small>
    </div>
  );
}
