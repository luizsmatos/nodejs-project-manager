import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticateUser } from '@/api/authenticate-user'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string(),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export function Login() {
  const navigate = useNavigate()

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting, errors } = form.formState

  const { mutateAsync: authenticateUserFn } = useMutation({
    mutationFn: authenticateUser,
  })

  async function handleLogin(data: LoginFormSchema) {
    try {
      await authenticateUserFn({ email: data.email, password: data.password })
      toast.success('Login efetuado com sucesso!')

      navigate('/boards')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu e-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar painel
              </Button>
            </form>
          </Form>

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
