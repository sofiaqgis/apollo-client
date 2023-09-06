import React from 'react'
//import './globals.css'
import { ApolloWrapper } from './apolloClient'

export const metadata = {
  title: 'Apollo-Client',
  description: 'Client-Server',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body><ApolloWrapper>{children}</ApolloWrapper></body>
    </html>
  );
}
