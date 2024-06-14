import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChevronDown, LogOut, UserCog } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserProfile } from '@/api/get-user-profile'
import { logout } from '@/api/logout'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    staleTime: Infinity,
    retry: false,
  })

  useEffect(() => {
    const handleAuthError = () => {
      const unauthorized =
        isError && error instanceof AxiosError && error.response?.status === 401

      if (unauthorized) {
        navigate('/login', { replace: true })
      }
    }

    handleAuthError()
  }, [error, isError, navigate, profile])

  const { mutateAsync: logoutFn, isPending: isComingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          <UserCog className="h-6 w-6" />
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isProfileLoading ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-500 dark:text-rose-400"
          disabled={isComingOut}
          onClick={() => logoutFn()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
