import { useSelector } from "react-redux";
import TasksDisplay from './TasksDisplay'

const NotDoneTasksDisplay = () => {
  const notDoneTasks = useSelector(store => store.tasks)
    .filter(task => !task.done)
    .toSorted((a,b) => a.position-b.position)
    
  return (
    <div>
      <TasksDisplay tasks={notDoneTasks}/>
    </div>
  )
}

export default NotDoneTasksDisplay