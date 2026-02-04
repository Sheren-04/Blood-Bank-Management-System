import { LoginHero } from '../components/admin-login/LoginHero';
import { LoginCard } from '../components/admin-login/LoginCard';

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex">
      <LoginHero />
      <LoginCard />
    </div>
  );
}
