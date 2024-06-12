import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-2 text-4xl font-bold">Página não encontrada</h1>
      <p>
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          início
        </Link>
      </p>
    </div>
  )
}
