import LoginForm from "./LoginForm";

export const metadata = {
  title: "login Next App",
  description: "login for start a game",
};

export default function loginPage() {
  //en el page o el layout ver si existe el user en localsorage, si no existe, entonces redirecionar a /app

  return (
    <div>
      <LoginForm />
    </div>
  );
}
