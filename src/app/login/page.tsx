import LoginForm from "./LoginForm";

export default function loginPage() {
  //en el page o el layout ver si existe el user en localsorage, si no existe, entonces redirecionar a /app

  return (
    <div>
      <LoginForm />
    </div>
  );
}
