import mongoose from 'mongoose'
const Schema = mongoose.Schema

var QuizSchema = new Schema({
  title: String,
  creator: String,
  created: {type: Date, default: Date.now},
  questions: [{
    question: String,
    options: [{
      text: String,
      correct: {type: Boolean, default: false}
    }]
  }]
})

mongoose.model('QuizSchema', QuizSchema)
export default QuizSchema
