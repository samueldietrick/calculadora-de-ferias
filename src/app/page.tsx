'use client';
 
import { useRouter } from 'next/navigation';
 
export default function Page() {
  const router = useRouter();
  router.push('/calculadoras/calculadora-ferias')
  return (
    <div></div>
  );
}