export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  videoUrl?: string
  documentationUrl?: string
  githubUrl?: string
  liveUrl?: string
  rankings?: string[]
  images?: string[]
  year: string
  category: string
}

export const projects: Project[] = [
  {
    id: "smart-home-automation",
    title: "Smart Home Automation System",
    shortDescription: "IoT-based home automation with real-time monitoring and control",
    fullDescription: `A comprehensive smart home system that integrates various IoT devices for seamless home automation. 
    
The system includes:
- Real-time temperature, humidity, and motion monitoring
- Automated lighting control based on ambient conditions
- Voice command integration
- Mobile app for remote control
- Energy consumption analytics

The project was developed using Arduino and Raspberry Pi for hardware, with a React Native mobile application and Node.js backend.`,
    technologies: ["Arduino", "Raspberry Pi", "React Native", "Node.js", "MQTT", "PostgreSQL"],
    rankings: ["1st Place - National IoT Competition 2024", "Best Innovation Award - Tech Expo"],
    year: "2024",
    category: "IoT"
  },
  {
    id: "ai-traffic-analysis",
    title: "AI Traffic Analysis Platform",
    shortDescription: "Machine learning system for real-time traffic flow optimization",
    fullDescription: `An AI-powered platform that analyzes traffic patterns and provides optimization recommendations for urban planning.

Key features:
- Real-time video analysis using computer vision
- Predictive modeling for traffic congestion
- Integration with traffic light systems
- Dashboard for city planners
- Historical data analysis and reporting

Built with Python, TensorFlow, and OpenCV for the ML components, with a React frontend and FastAPI backend.`,
    technologies: ["Python", "TensorFlow", "OpenCV", "React", "FastAPI", "Docker"],
    rankings: ["2nd Place - AI Challenge 2024", "Innovation Award - Smart City Hackathon"],
    year: "2024",
    category: "AI/ML"
  },
  {
    id: "blockchain-voting",
    title: "Blockchain Voting System",
    shortDescription: "Secure and transparent voting platform using blockchain technology",
    fullDescription: `A decentralized voting system that ensures transparency and security in electoral processes.

Features include:
- Immutable vote recording on blockchain
- Anonymous voting with verification
- Real-time results tracking
- Multi-factor authentication
- Audit trail for transparency

Developed using Solidity for smart contracts, Web3.js for blockchain interaction, and Next.js for the frontend.`,
    technologies: ["Solidity", "Web3.js", "Next.js", "Ethereum", "TypeScript", "Hardhat"],
    rankings: ["Best Security Implementation - Blockchain Summit"],
    year: "2023",
    category: "Blockchain"
  },
  {
    id: "robotics-arm",
    title: "6-DOF Robotic Arm Controller",
    shortDescription: "Precision robotic arm with computer vision for object manipulation",
    fullDescription: `A six-degree-of-freedom robotic arm system with integrated computer vision for precise object manipulation.

Capabilities:
- Sub-millimeter positioning accuracy
- Real-time object recognition and tracking
- Gesture-based control interface
- Path planning algorithms
- Safety collision detection

The project combines mechanical engineering with software, using ROS for robot control, Python for vision processing, and a custom GUI built with Qt.`,
    technologies: ["ROS", "Python", "OpenCV", "C++", "Qt", "CAD/CAM"],
    rankings: ["1st Place - Robotics Olympiad 2023", "Technical Excellence Award"],
    year: "2023",
    category: "Robotics"
  }
]

export interface Achievement {
  year: string
  title: string
  description: string
  type: "competition" | "certification" | "award"
}

export const achievements: Achievement[] = [
  {
    year: "2024",
    title: "1st Place - National IoT Competition",
    description: "Smart Home Automation System project",
    type: "competition"
  },
  {
    year: "2024",
    title: "Best Innovation Award - Tech Expo",
    description: "Recognition for innovative IoT solutions",
    type: "award"
  },
  {
    year: "2024",
    title: "2nd Place - AI Challenge",
    description: "Traffic Analysis Platform",
    type: "competition"
  },
  {
    year: "2023",
    title: "1st Place - Robotics Olympiad",
    description: "6-DOF Robotic Arm project",
    type: "competition"
  },
  {
    year: "2023",
    title: "Technical Excellence Award",
    description: "Outstanding technical implementation in robotics",
    type: "award"
  },
  {
    year: "2023",
    title: "Best Security Implementation - Blockchain Summit",
    description: "Blockchain Voting System",
    type: "award"
  }
]
