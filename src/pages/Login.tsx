import { useNavigate } from "react-router-dom"
import Input from "../components/forms/input"

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    navigate("/dashboard"); 
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <Input label="correo" holder="Ingresa el correo"/>
      <Input label="contraseña" holder="Ingresa la contraseña"/>
      <button type="submit">Iniciar sesión</button>
    </form>
      <div>Login</div>
    
    </>
  )
}

export default Login