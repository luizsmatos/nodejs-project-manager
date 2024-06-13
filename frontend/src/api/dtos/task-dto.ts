export enum EnumTaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskDTO {
  id: string
  projectId: string
  title: string
  description: string
  status: EnumTaskStatus
  completedBy: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string | null
}
