import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SingInFormData = {
    email:string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm<SingInFormData>();
    const mutation = useMutation(apiClient.singIn, {
        onSuccess: async()=>{
            showToast({message: "Inicio de Sesión Exitoso", type:"Exitoso"});
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError: (error:Error)=>{
            showToast({message: error.message, type: "Error"})

        }
    }
    )

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
                Inicia Sesión
            </h2>
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
        <span className="flex items-center justify-between">
        Aun no tienes una cuenta? <Link className="underline" to="/register">Crea una Cuenta Aqui</Link>
        <span>

        </span>
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                Inicia Sesión
            </button>
        </span>

        </form>
    )
}

export default SignIn