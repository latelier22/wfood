'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import FormAuth from "@/components/ui/FormAuth"

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <>
    <FormAuth title={"CONNECTEZ VOUS AVEC VOTRE EMAIL"} btnAction={"Se connecter"} handleSubmit={handleSubmit}/>
    </>
  );
}
