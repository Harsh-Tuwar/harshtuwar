'use client';
import useSWR from 'swr';
import { Container, SlideFade, Flex, Divider } from '@chakra-ui/react';

import { fetcher } from '@/utils/fetcher';

import PageHeader from '@/components/PageHeader';
import Profile from '@/components/sections/Profile';
import TechStack from '@/components/sections/TechStack';

export default function Home() {
  const { data } = useSWR('/api/spotify', fetcher);

  return (
    <div style={{ padding: '0 2rem' }}>
      <PageHeader />
      <main>
        <Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
          <SlideFade in offsetX={80}>
            <Flex width="full" align="center" justifyContent="center" flexDirection="column">
              <Profile song={data} />
              <Divider my={7} />
              <TechStack />
            </Flex>
          </SlideFade>
        </Container>
      </main>
    </div>
  )
}
