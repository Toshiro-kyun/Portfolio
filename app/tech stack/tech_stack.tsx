import TechStackNetwork from "@/components/tech stack/network";

export default function TechStack(){
    const graph = {
        labels: ['Languages', 'Frameworks', 'Tools'],
        nodes: [
          // Input Layer
          {
            id: 'python',
            name: 'Python',
            layer: 0,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            description: 'Primary language for AI/ML, data science, and automation',
            links: ['pytorch', 'tensorflow', 'sklearn']
          },
          {
            id: 'javascript',
            name: 'JavaScript',
            layer: 0,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            description: 'Web development and full-stack applications',
            links: ['pytorch', 'pandas']
          },
          {
            id: 'cpp',
            name: 'C++',
            layer: 0,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
            description: 'High-performance computing and algorithm optimization',
            links: ['tensorflow', 'sklearn', 'pandas']
          },
          {
            id: 'sql',
            name: 'SQL',
            layer: 0,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            description: 'Database querying and data manipulation',
            links: ['pandas']
          },
    
          // Hidden Layer 1
          {
            id: 'pytorch',
            name: 'PyTorch',
            layer: 1,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
            description: 'Deep learning framework with dynamic computational graphs',
            links: ['git', 'jupyter']
          },
          {
            id: 'tensorflow',
            name: 'TensorFlow',
            layer: 1,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
            description: 'End-to-end machine learning platform for production',
            links: ['git', 'linux']
          },
          {
            id: 'sklearn',
            name: 'scikit-learn',
            layer: 1,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
            description: 'Classical machine learning algorithms and preprocessing',
            links: ['jupyter', 'linux']
          },
          {
            id: 'pandas',
            name: 'Pandas',
            layer: 1,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
            description: 'Data manipulation and analysis library',
            links: ['jupyter']
          },
    
          // Hidden Layer 2
          {
            id: 'git',
            name: 'Git',
            layer: 2,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            description: 'Version control for collaborative development',
            links: ['docker', 'aws']
          },
          {
            id: 'jupyter',
            name: 'Jupyter',
            layer: 2,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
            description: 'Interactive notebooks for experimentation and visualization',
            links: ['docker']
          },
          {
            id: 'linux',
            name: 'Linux',
            layer: 2,
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
            description: 'Primary development and deployment environment',
            links: ['docker', 'aws']
          },
        ]
      };


    return(
        <div
            className="flex flex-col items-center justify-start w-full pb-10
                min-h-screen bg-black">
            <div className="bg-linear-to-b from-blue-900 to-black w-full h-17"></div>
            <h1 className="text-6xl font-bold mt-5"> Tech Stack </h1>
            <h6 className="text-lg font-light text-[#737373] text-transform: uppercase mb-[0.5rem] mt-1 font-['IBM_Plex_Mono',_monospace]"> Tech Stack </h6>

            <div className="flex flex-grow justify-center items-center w-full">
                <TechStackNetwork graph={graph}/>
            </div>
        </div>
    )
}