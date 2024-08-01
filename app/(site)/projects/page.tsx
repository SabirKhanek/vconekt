import { V3dContactUs } from '@/components/site/3dLogoInContactUs';

import Link from 'next/link';
import { Project, ProjectCard, projects } from './comps';
import Head from 'next/head';
import { getProjects } from '@/app/actions/projects';

export default async function Projects() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.log(err);
  }
  console.log(projects);
  return (
    <>
      <div className="relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-36 text-white">
        <Head>
          <meta
            name="title"
            content="VConekt Projects | Showcasing Innovation & Success Stories"
          />
          <meta
            name="description"
            content="Explore VConekt's transformative projects! We craft cutting-edge web, app, and digital solutions that drive real results for businesses. Get inspired today!"
          />
        </Head>
        <div className="relative flex h-64 flex-col items-center justify-center">
          <V3dContactUs scale={0.7} />

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <h2 className="heading uppercase ">Projects</h2>
            <div className="flex items-center gap-3 font-orbit font-medium ">
              <Link
                href={'/'}
                className="cursor-pointer text-primary hover:underline"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link
                href={'/about-us'}
                className="cursor-pointer hover:underline"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive relative z-[2]">
        <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
          Projects
        </span>
        <h2 className="heading">
          Explore Our Diverse Portfolio of Success{' '}
          <span className="text-primary">Stories</span>
        </h2>
        <div className="my-3 mb-10 flex flex-col gap-10 520:flex-row">
          {[0, 1].map((v, i) => {
            const half = Math.ceil(projects.length / 2);
            const projectSubset =
              i === 0 ? projects.slice(0, half) : projects.slice(half);

            return (
              <div
                key={v}
                className={`flex flex-1 flex-col gap-10 ${
                  i === 1 ? '520:-translate-y-[75px]' : ''
                }`}
              >
                {projectSubset.map((project, j) => (
                  <ProjectCard key={j} project={project} />
                ))}
              </div>
            );
          })}
        </div>
        <hr className="mx-auto my-0 mb-5 h-0.5 max-w-2xl bg-white/30" />
        {/* <div className="my-10 flex items-center justify-center">
          <Button>Load More</Button>
        </div> */}
      </div>
    </>
  );
}
