
import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';

// A FAIRE : metadata avec page

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <main>
      
       
        <Form/>
      
      
    </main>
  );
}
