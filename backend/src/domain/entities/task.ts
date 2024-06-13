export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  completedBy: string | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
}
