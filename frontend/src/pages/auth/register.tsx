import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
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

const registerFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome muito curto' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'Sua senha deve ter no mínimo 6 caracteres' }),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export function Register() {
  const navigate = useNavigate()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { isSubmitting, errors } = form.formState

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleRegister(data: RegisterFormSchema) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('Conta criada com sucesso!', {
        action: {
          label: 'Fazer login',
          onClick: () => navigate('/'),
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
                    <FormMessage>
                      {errors.password && (
                        <p className="text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
          </Form>
        </div>
      </div>
    </>
  )
}
