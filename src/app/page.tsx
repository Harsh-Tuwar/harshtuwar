'use client';
const dynamic = 'force-dynamic';
const revalidate = 0

import useSWR from 'swr';
import { Container, SlideFade, Flex, Divider } from '@chakra-ui/react';

import { fetcher } from '@/utils/fetcher';

import PageHeader from '@/components/PageHeader';
import Profile from '@/components/sections/Profile';
import TechStack from '@/components/sections/TechStack';
import { useEffect, useState } from 'react';

interface SpotifyNotPlaying {
	isPlaying: boolean;
}

interface SpotifySong extends SpotifyNotPlaying {
	album: string;
	albumImageUrl: string;
	artist: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
};

export default function Home() {
  const [songData, setSongData] = useState<SpotifySong >({ isPlaying: true, album: '', albumImageUrl: '', artist: '', songUrl: '', title: '' });

  const { data } = useSWR('/api/spotify', fetcher, {
    revalidateOnFocus: true,
  });

  useEffect(() => {
    setSongData(data);
  }, [data]);

  return (
    <div style={{ padding: '0 2rem' }}>
      <PageHeader />
      <main>
        <Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
          <SlideFade in offsetX={80}>
            <Flex width="full" align="center" justifyContent="center" flexDirection="column">
              <Profile song={songData} />
              <Divider my={7} />
              <TechStack />
            </Flex>
          </SlideFade>
        </Container>
      </main>
    </div>
  )
}
