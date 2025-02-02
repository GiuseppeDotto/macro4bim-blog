// netlify/functions/fetchPosts.js
import mongoose from "mongoose";
import Post from "../../mongodb-mongoose/model/Post";
let conn = null;

module.exports.handler = async (event, context) => {
  const uri = process.env.MONGODB_URI;
  if (!conn) {
    conn = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await conn;
  }

  try {
    await conn;
    const query = event.queryStringParameters;
    let published = query.published || "";
    const allPost = await Post.find({ published: `${published}` })
      .sort({ createdAt: 1 })
      .exec();
    console.log("here is mongoose", allPost);
    return {
      statusCode: 200,
      body: JSON.stringify(allPost),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to fetch posts: ${error}` }),
    };
  }
};
