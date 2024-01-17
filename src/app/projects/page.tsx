'use client';
import PageHeader from '@/components/PageHeader';
import PageTitle from '@/components/PageTitle';
import { PageSlideFade } from '@/components/PageTransitions';
import Paragraph from '@/components/Paragraph';
import { ProjectLayoutMed, LeftProjectLayoutLarge, RightProjectLayoutLarge } from '@/components/ProjectLayout';
import { fetcher } from '@/utils/fetcher';
import { Container, VStack, Box, Skeleton } from '@chakra-ui/react';
import { Fragment } from 'react';
import useSWR from 'swr';

export interface IProject {
  title: string;
  image: string;
  site: string;
  github: string;
  description: string;
  techStack: string[];
  ordinal: number;
};

const subtitle = "A selection of projects I've worked on, during my career as a software developer.";

const Projects = () => {
  const { data, isLoading } = useSWR('/api/projects', fetcher);
  
  return (
    <div>
      <PageHeader />
      <main>
        <Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
          <PageSlideFade>
            <Box>
              <PageTitle mt={0} mb={6} emoji="💻">
                Projects
              </PageTitle>

              <Paragraph fontSize="lg" lineHeight={1.6} my={5}>
                {subtitle}
              </Paragraph>

              <VStack spacing={8} mt={["7", "0", "0"]}>
                {(!isLoading) ? data.projects.sort((a: IProject, b: IProject) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0))).map((project: IProject, index: number) => (
                  <Fragment key={index}>
                    <ProjectLayoutMed project={project} />
                    {index % 2 === 0 ? (
                      <LeftProjectLayoutLarge project={project}/>
                    ) : (
                      <RightProjectLayoutLarge project={project}/>
                    )}
                  </Fragment>
                )) : <>
                    <Skeleton height='400px' width={'100%'} rounded="md" />
                    <Skeleton height='400px' width={'100%'} rounded="md" />
                    <Skeleton height='400px' width={'100%'} rounded="md" />
                    <Skeleton height='400px' width={'100%'} rounded="md"/>
                </>}
              </VStack>
            </Box>
          </PageSlideFade>
        </Container>
      </main>
    </div>
  );
}

export default Projects;
