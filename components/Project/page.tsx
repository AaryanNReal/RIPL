'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
  description: string;
  imageUrl: string;
  title: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'Card', 'Project');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProjects(Object.values(data).filter(item => typeof item === 'object'));
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

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C19A6B]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#C19A6B]">
        Our Projects
      </h2>

      <div className="px-2">
        <Swiper
          modules={[Navigation, Pagination , Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
          }}
          className="pb-10"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => openModal(project)}
              >
                <Card
                  imageUrl={project.imageUrl}
                  title={project.title}
                  description={project.description}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={closeModal}
          ></div>
          
          <div className="relative z-50 w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg max-h-[70vh] sm:max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-[#C19A6B] text-white">
              <h3 className="text-base sm:text-lg font-bold line-clamp-1">{selectedProject.title}</h3>
              <button 
                onClick={closeModal}
                className="text-xl sm:text-2xl hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            
            <div className="overflow-y-auto p-2 sm:p-4">
              {selectedProject.imageUrl && (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-32 sm:h-40 object-cover rounded mb-2 sm:mb-4"
                />
              )}
              <p className="text-gray-700 text-xs sm:text-sm">{selectedProject.description}</p>
            </div>
            
            <div className="p-2 sm:p-3 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-[#C19A6B] text-white rounded hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}