import express from 'express'
import cors from 'cors'
import reqLogger from './middlewear/requestLogger.js'

const app = express()

// Express.json() returns a middlewear for parsing json data into js objects, and assigning to 
// the data attribute of the request object
app.use(express.json())

// Cors (cross-origin-reference-policy) is used to prevent session hijacking, ensuring that certain web resources can only be accessed from
// the same origin as that resource
app.use(cors())

app.use(reqLogger)

let tasks = [
  {
    content:'write the express server',
    done: false,
    id:"1",
    position: 3
  },
  {
    content:'connect to mongoDB',
    done: false,
    id:"2",
    position: 2
  },
  {
    content:'write the app frontend using redux <3',
    done: true,
    id:"3",
    position: 1
  },
  {
    content:'get the positioning functions working',
    done: false,
    id:"4",
    position: 4
  },
  {
    content:'implement the dnd',
    done: false,
    id:"5",
    position: 1
  }
]

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

const generateId = () => {
  return Math.ceil(Math.random() * 10000).toString()
}

app.post('/api/tasks', (req, res) => {
  const newTask = {...req.body, id: generateId()}
  tasks.push(newTask)
  res.json(newTask)
}) 

app.put('/api/tasks/batch', (req, res) => {
  const updatedTasks = req.body;

  updatedTasks.forEach(updatedTask => {
    tasks = tasks.map(task => task.id !== updatedTask.id ? task : updatedTask);
  });

  console.log(updatedTasks);

  res.status(200).json(updatedTasks).end();
})

app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id

  const updatedTask = req.body

  tasks = tasks.map(task => task.id !== id
    ? task
    : updatedTask
  )

  res.json(updatedTask).status(200)
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id
  tasks = tasks.filter(task => task.id !== id)
  
  res.status(204).end()
})


app.listen(3001, () => {
  console.log("listening on port 3001")
})