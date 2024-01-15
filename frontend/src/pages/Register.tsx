import {useForm} from "react-hook-form"
import {useMutation, useQueryClient} from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}



const Register = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const {showToast} = useAppContext();

    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register,{
        onSuccess: async () =>{
            showToast({message:"Registro Exitoso", type: "Exitoso"})
            await queryClient.invalidateQueries("validateToken")
            navigate("/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "Error"})
        }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
    })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Crea una Cuenta</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold">
            Nombre 
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName",{required:"Este Campo es Requerido"})}></input>
        {errors.firstName && (
            <span className="text-red-500">{errors.firstName?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
            Apellido
            <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName",{required:"Este Campo es Requerido"})}></input>
            {errors.lastName && (
            <span className="text-red-500">{errors.lastName?.message}</span>
        )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
            Correo Electronico
            <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"Este Campo es Requerido"})}></input>
            {errors.email && (
            <span className="text-red-500">{errors.email?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
            Contraseña
            <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{required:"Este Campo es Requerido", minLength:{
                value:6,
                message: "La contraseña debe tener al menos 6 caracteres"
            }})}></input>
               {errors.password && (
            <span className="text-red-500">{errors.password?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
            Confirma Contraseña
            <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
            {...register("confirmPassword",{
                validate:(val)=>{
                    if(!val){
                        return "Este Campo es Requerido"
                    } else if(watch("password") !== val){
                        return "Tu Contraseña no Coincide"
                    }
                }
            })}></input>
               {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword?.message}</span>
        )}
        </label>
        <span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Crea tu Cuenta
            </button>
        </span>
    </form>
  )
}

export default Register
