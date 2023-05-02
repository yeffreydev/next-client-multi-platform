import LoginForm from "./LoginForm";

export const metadata = {
  title: "login Next App",
  description: "login for start a game",
};

export default function loginPage() {
  return (
    <div className="flex mx-auto max-w-[400px] relative mt-[50px]">
      <LoginForm />
    </div>
  );
}
