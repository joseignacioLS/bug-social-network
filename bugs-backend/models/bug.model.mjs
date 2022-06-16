import mongoose from "mongoose";

const Schema = mongoose.Schema


const bugSchema = new Schema(
  {
    name: {type: String, required:true},
    createdAt: {type: String, required: true},
    user: {type: String, required:true},
    description: {type: String, required:true},
    image: {type: String},
    location: {type: String},
    tags: {type: String}
  },
  {
    collection:"bugs"
  }
)

const Bug = mongoose.model("Bug", bugSchema)

export {Bug}