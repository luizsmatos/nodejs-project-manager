import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: LoginFormSchema) {
    console.log(data)

    toast.success('Seja bem-vindo!')
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencia seus projetos de forma simples e eficiente.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>

          <div className="flex flex-col gap-2 text-center">
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Não possui uma conta?{' '}
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                to="/register"
              >
                Crie uma conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
