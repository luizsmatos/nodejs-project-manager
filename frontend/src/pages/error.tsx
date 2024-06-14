import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-2 text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p>
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          início
        </Link>
      </p>
    </div>
  )
}
