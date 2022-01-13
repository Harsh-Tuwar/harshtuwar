import {
    SiFirebase,
    SiGmail,
    SiTypescript,
    SiReact,
    SiMongodb,
    SiMaterialui,
    SiTailwindcss,
    SiRedux,
    SiPython,
    SiGooglecloud,
    SiMicrosoftazure,
    SiMysql,
    SiGraphql,
    SiFlutter,
    SiVisualstudiocode,
    SiDocker,
    SiNodedotjs
} from 'react-icons/si';
import { FaJs, FaGitAlt, FaLinkedin, FaGithub, FaAws } from "react-icons/fa";
import { CgAlbum } from "react-icons/cg";

const NavbarItems = [
    { name: "Home", route: "/" },
    { name: "About Me", route: "/about" },
    // { name: 'Projects', route: '/projects' },
    { name: "Contact", route: "/contact" },
]

const SiteConfig = {
    copyright: `Copyright © ${new Date().getFullYear()} Harsh Tuwar. All Rights Reserved.`,
    author: {
        name: "Harsh Tuwar",
        accounts: [
            {
                url: "https://github.com/harsh-tuwar",
                icon: <FaGithub />,
                name: "Github",
                type: "gray"
            },
            {
                url: "https://www.linkedin.com/in/htuwar08",
                icon: <FaLinkedin />,
                name: "Linkedin",
                type: "linkedin"
            },
            {
                url: "mailto:tuwarharsh08@gmail.com",
                icon: <SiGmail />,
                name: "Gmail",
                type: "red"
            }
        ]
    }
}

const Resume = {
    url: "https://drive.google.com/file/d/1uU61rGC1q_bxADdtqLvc1NPvH9GYDKbJ/view?usp=sharing",
    icon: <CgAlbum />,
    name: "Resume"
}

const techStacks = [
    {
        name: "Typescript",
        icon: <SiTypescript fontSize="20px" />
    },
    {
        name: "Javascript",
        icon: <FaJs fontSize="20px" />
    },
    {
        name: "Python",
        icon: <SiPython fontSize="20px" />
    },
    {
        name: "React & React Native",
        icon: <SiReact fontSize="20px" />
    },
    {
        name: "Redux",
        icon: <SiRedux fontSize="20px" />
    },
    {
        name: "Material UI",
        icon: <SiMaterialui fontSize="20px" />
    },
    {
        name: "Tailwind CSS",
        icon: <SiTailwindcss fontSize="20px" />
    },
    {
        name: "NodeJS",
        icon: <SiNodedotjs fontSize="20px" />
    },
    {
        name: "Google Cloud",
        icon: <SiGooglecloud fontSize="20px" />
    },
    {
        name: "Azure",
        icon: <SiMicrosoftazure fontSize="20px" />
    },
    {
        name: "Amazon Web Services",
        icon: <FaAws fontSize="20px" />
    },
    {
        name: "MySQL",
        icon: <SiMysql fontSize="20px" />
    },
    {
        name: "Firebase",
        icon: <SiFirebase fontSize="20px" />,
    },
    {
        name: "MongoDB",
        icon: <SiMongodb fontSize="20px" />,
    },
    {
        name: "GraphQL",
        icon: <SiGraphql fontSize="20px" />
    },
    {
        name: "Flutter",
        icon: <SiFlutter fontSize="20px" />
    },
    {
        name: "VSCode",
        icon: <SiVisualstudiocode fontSize="20px" />
    },
    {
        name: "Docker",
        icon: <SiDocker fontSize="20px" />,
    },
    {
        name: "Github & GitLab",
        icon: <FaGitAlt fontSize="20px" />,
    },
]

const companies = [
    {
        title: "Brane Inc.",
        alt: "brane image",
        url: 'https://www.brane.ca/',
        role: "Software Developer",
        skills: ["TypeScript", "JavaScript", "React", "MeteorJS", "Docker", "Azure", "NodeJS", "Express", "Github"],
        period: "Sept 2021 - Present",
        logo: '/brane.jpeg'
    },
    {
        title: "Reach Boarding Systems Inc.",
        alt: "reach",
        url: "https://reach.cloud/",
        role: "Software Developer",
        skills: ["TypeScript", "Python", "Google Cloud", "PWA", "Cordova", "Material Design", "Apache", "MySQL", "NodeJS", "Linux"],
        period: "Apr 2019 - Sept 2021",
        logo: '/reach.png'
    }
]

const educations = [
    {
        title: "Seneca College of Applied Arts and Technology",
        alt: "Seneca image",
        url: "https://www.senecacollege.ca/home.html",
        role: "Diploma in Computer Programming",
        skills: ["CGPA - 3.5", "Web & Mobile App Development", "Database Administation", "Network Security"],
        period: "Apr 2017 - Apr 2019",
        logo: '/seneca.jpeg'
    },
]

const certifications = [
    {
        title: "freeCodeCamp",
        alt: "freeCodeCamp",
        url: "https://www.freecodecamp.org/certification/fcca64b2bf4-bc47-4608-b18b-70ccc1e6a603/javascript-algorithms-and-data-structures",
        role: "JavaScript Algorithms and Data Structures",
        skills: ["Algorithms", "Data Structures", "Object Oriented Programming (OOP)", "Functional Programming"],
        period: "Aug 2021 - No Expiry",
        logo: '/freecodecamp.jpeg'
    },
    {
        title: "TestDome",
        alt: "testdome",
        url: "https://www.testdome.com/cert/0f3aa2e7459b43fba857b18528944beb",
        role: "HTML/CSS, JavaScript, and React",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        period: "Jan 2020 - Jan 2023",
        logo: '/testdome.png'
    },
    {
        title: "TestDome",
        alt: "testdome",
        url: "https://www.testdome.com/cert/e6b172cc381e4fc8aa4be38f899a2fbe",
        role: "React",
        skills: ["React"],
        period: "Jan 2020 - Jan 2023",
        logo: '/testdome.png'
    },
]

const Projects = [
    {
        name: 'Chat App',
        description: 'Description',
        language: 'TypeScript',
        clone_url: 'https://github.com/Harsh-Tuwar/Chat-App'
    }
]


export { NavbarItems, techStacks, SiteConfig, Resume, companies, educations, certifications, Projects }
