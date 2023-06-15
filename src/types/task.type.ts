interface TaskType {
  id: number
  createDate: number
  dueDate: number
  name: string
  desc: string
  priority: 'low' | 'medium' | 'hight' | 'urgent'
  status: 'pending' | 'in progress' | 'Completed'
}

export default TaskType
