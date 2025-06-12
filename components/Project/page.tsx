'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase';
import Card from './Card'; // Adjust the import path as necessary

interface Project {
  description: string;
  imageUrl: string;
  title: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'Card', 'Project');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const projectsArray: Project[] = [];
          
          // Extract all project_* maps
          Object.keys(data).forEach(key => {
            if (key.startsWith('project_')) {
              projectsArray.push(data[key] as Project);
            }
          });
          
          setProjects(projectsArray);
        } else {
          setError('No projects found');
        }
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: '#C19A6B' }}
        ></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-10">No projects available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 
        className="text-3xl font-bold text-center mb-12"
        style={{ color: '#C19A6B' }}
      >
        Our Projects
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card
            key={`project-${index}`}
            imageUrl={project.imageUrl}
            title={project.title}
            description={project.description}
            // Add linkUrl if you want projects to be clickable
            // linkUrl={`/projects/${index}`}
          />
        ))}
      </div>
    </div>
  );
}