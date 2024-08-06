import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.role = token.role || 'authenticated'; // Ajouter un rôle par défaut
        session.jwt = token.jwt; // Ajouter le JWT à la session
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.role = user.role || 'authenticated'; // Ajouter un rôle par défaut
        token.jwt = user.jwt; // Ajouter le JWT au token
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const url = process.env.NEXT_PUBLIC_ADMIN_STRAPI_URL || "https://admin.teranga-resto-galerie.fr";
          const res = await fetch(`${url}/api/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log('Response from Strapi:', data);

          if (data.jwt) {
            const userRes = await fetch(`${url}/api/users/me?populate=role`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${data.jwt}`,
                'Content-Type': 'application/json',
              },
            });

            const userData = await userRes.json();
            console.log('User data with role:', userData);

            if (typeof window !== 'undefined') {
              localStorage.setItem('token', data.jwt);
              localStorage.setItem('user', JSON.stringify(userData));
              console.log('Stored token and user in localStorage');
            }

            const user = {
              id: userData.id,
              email: userData.email,
              role: userData.role?.type || 'authenticated', // Ajouter un rôle par défaut si non fourni
              jwt: data.jwt, // Inclure le JWT dans l'objet utilisateur
            };

            return user;
          } else {
            console.log('No JWT received from Strapi');
          }
        } catch (error) {
          console.error('Error in authorize function:', error);
        }

        return null;
      },
    }),
  ],
};
