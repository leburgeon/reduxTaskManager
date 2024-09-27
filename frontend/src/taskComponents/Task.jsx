import EditTaskForm from "./EditTaskForm"
import { useDispatch } from "react-redux"
import { deleteTask, toggleDone } from "../reducers/taskReducer"
import { buttonStyle } from "../styles/buttonStyle"
import { useSelector } from "react-redux"
import { setIsEdit } from "../reducers/isEditReducer"
import '../styles/Task.css'
import { Draggable } from "@hello-pangea/dnd"

const Task = ({ task }) => {
  // There is a cost decision to be made here:
  // Is it more expensive to useSelector for every task element to check if its being edited
  // or is it more expensive to raise the state but then re-render all the tasks when one is being edited
  const isEdit = useSelector(state => state.isEdit === task.id)

  const dispatch = useDispatch()

  const taskContentStyle = task.done
    ? { textDecoration: 'line-through' }
    : {}
  
  const renderDisplayDetails = () => {
    return (
      <>
        <p style={taskContentStyle} onDoubleClick={() => dispatch(setIsEdit(task.id))}>
          {task.content + ' '}
        </p>
        <button style={buttonStyle} onClick={() => dispatch(toggleDone(task))}>
          {task.done? 'undo' : 'done'}
        </button>
        <button style={buttonStyle} onClick={() => dispatch(deleteTask(task))}>
          delete
        </button>
      </>
    )
  }
  
  return (
    <Draggable draggableId={task.id} index={task.position}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className="task-container">
            {!isEdit ? renderDisplayDetails() : <EditTaskForm oldTask={task}/> }
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task