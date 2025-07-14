import mongoose from "mongoose";    

const blogSchema = new mongoose.Schema({
    url:{type:String},
    text:{type:String}
})

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;