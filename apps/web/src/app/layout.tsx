'use client';
import '../styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Navbar } from 'src/components';
import { AuthenticationModal, authentication } from 'src/modules';
import { getLocalStorageItem } from 'src/modules/Apis/httpService/helpers';
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const isPreAuthenticated = getLocalStorageItem('token');
    if (isPreAuthenticated) {
      authentication({ isAuthenticated: true });
    }
  }, []);

  const dehydratedState = dehydrate(queryClient);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="text-primary-800 bg-primary-50 overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <MantineProvider>
              <Navbar />
              <main
                className="w-full overflow-y-scroll mt-16 py-4"
                style={{ scrollbarWidth: 'thin', height: 'calc(100% - 4rem)' }}
              >
                <div className="container mx-auto h-fit">{children}</div>
              </main>
              <AuthenticationModal />
              <ReactQueryDevtools initialIsOpen={false} />
            </MantineProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
