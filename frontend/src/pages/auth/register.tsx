import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormSchema) {
    try {
      console.log(data)

      toast.success('Conta criada com sucesso!', {
        action: {
          label: 'Fazer login',
          onClick: () => navigate('/login'),
        },
      })
    } catch (error) {
      toast.error('Erro ao criar conta, tente novamente.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Comece a gerenciar seus projetos de forma simples e eficiente.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div>
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar Cadastro
            </Button>

            <div className="flex flex-col gap-2 text-center">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Já tem uma conta?{' '}
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                  to="/login"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
