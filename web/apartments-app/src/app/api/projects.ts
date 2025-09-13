export type Project = {
  id: number;
  name: string;
};

import { baseApi } from './baseApi';


export async function fetchProjects() {
  console.log('Fetching projects...');
  return baseApi<Project[]>(`/api/projects`, { cache: 'no-store' });
}