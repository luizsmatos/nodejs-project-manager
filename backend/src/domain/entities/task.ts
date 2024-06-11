export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  completedBy: string
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
}
