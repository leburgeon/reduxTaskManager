import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false
  },
  position: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// schema.set(option, value) is used to set options for the schema
// This method sets the transform method that is used when the toJSON method is called
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    // Checks if the user field is an Object id, incase it has not yet been populated
    if (returnedObject.user && returnedObject.user instanceof mongoose.Types.ObjectId){
      // Converts the ObjectId to a string
      returnedObject.user = returnedObject.user.toString()
    }
  }
})

export default mongoose.model('Task', taskSchema)