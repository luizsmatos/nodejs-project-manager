import { Projects } from './projects/projects'

export function SideBar() {
  return (
    <div className="border-r border-gray-200 p-5 dark:border-gray-700">
      <Projects />
    </div>
  )
}
