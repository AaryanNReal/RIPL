'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase';
import Card from './card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination , Autoplay } from 'swiper/modules';

// Import Swiper styles
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'Card', 'Work');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const projectsArray: Project[] = [];
          
          Object.keys(data).forEach(key => {
            if (key.startsWith('work_')) {
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

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

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
    <div className="container mx-auto px-4 py-8 ">
      <h2 
        className="text-3xl font-bold text-center mb-12"
        style={{ color: '#C19A6B' }}
      >
        What We Do
      </h2>
      
      {/* Swiper Slider */}
      <div className="px-4 ">
        <Swiper
          modules={[Navigation,  Autoplay, Pagination ]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="pb-10"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={`project-${index}`}>
              <div 
                onClick={() => handleCardClick(project)}
                className="cursor-pointer h-full"
              >
                <Card
                  title={project.title}
                  description={project.description}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/70 transition-opacity duration-300"
            onClick={closeModal}
          ></div>

          {/* Modal container */}
          <div 
            className="relative w-full max-w-2xl mx-auto my-8"
          >
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Modal header */}
              <div 
                className="px-6 py-4 border-b"
                style={{ backgroundColor: '#C19A6B' }}
              >
                <h3 className="text-xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                {/* Close button for mobile */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              
              {/* Modal body */}
              <div className="p-4 md:p-6 max-h-[80vh] overflow-y-auto">
                {selectedProject.imageUrl && (
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-48 md:h-64 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>
              
              {/* Modal footer - hidden on mobile, shown on desktop */}
              <div className="hidden md:flex px-6 py-4 bg-gray-50 justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: '#C19A6B' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}