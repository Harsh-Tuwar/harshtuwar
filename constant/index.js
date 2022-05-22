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
import { HiOutlineHeart, HiCheck } from "react-icons/hi";
import { BiGlasses } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";

const NavbarItems = [
    { name: "Home", route: "/" },
    { name: "About Me", route: "/about" },
    { name: 'Projects', route: '/projects' },
    { name: "Books", route: "/books" },
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
                url: "https://www.linkedin.com/in/tuwar08",
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
    url: "",
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
];

const companies = [
    {
        title: "DMG Blockchain Solutions Inc.",
        alt: "dmg image",
        url: 'https://dmgblockchain.com/',
        role: "Full Stack Developer - Lead",
        skills: ["TypeScript", "React", "NextJS", "ContextAPI", "Docker", "AWS", "NodeJS", "Express", "PostgreSQL", "Blockchain", "Go"],
        period: "Mar 2022 - Present",
        logo: '/images/work-exp/dmg.png'
    },
    {
        title: "Brane Inc.",
        alt: "brane image",
        url: 'https://www.brane.ca/',
        role: "Full Stack Developer",
        skills: ["TypeScript", "JavaScript", "React", "MeteorJS", "Docker", "Azure", "NodeJS", "Express", "Github"],
        period: "Sept 2021 - Mar 2022",
        logo: '/images/work-exp/brane.jpeg'
    },
    {
        title: "Reach Boarding Systems Inc.",
        alt: "reach",
        url: "https://reach.cloud/",
        role: "Software Developer",
        skills: ["TypeScript", "Python", "Google Cloud", "PWA", "Cordova", "Material Design", "Apache", "MySQL", "NodeJS", "Linux"],
        period: "Apr 2019 - Sept 2021",
        logo: '/images/work-exp/reach.png'
    }
];

const educations = [
    {
        title: "Seneca College of Applied Arts and Technology",
        alt: "Seneca image",
        url: "https://www.senecacollege.ca/home.html",
        role: "Diploma in Computer Programming",
        skills: ["CGPA - 3.5", "Web & Mobile App Development", "Database Administation", "Network Security"],
        period: "Apr 2017 - Apr 2019",
        logo: '/images/education/seneca.jpeg'
    },
];

const certifications = [
    {
        title: "HackerRank",
        alt: "HackerRank",
        url: "https://www.hackerrank.com/certificates/4ed3f112170c",
        role: "Problem Solving (Intermediate)",
        skills: ["Data Structures", "HashMaps", "Stacks", "Queues", "Algorithms"],
        period: "May 2022 - No Expiry",
        logo: '/images/certs/hackerrank.png'
    },
    {
        title: "HackerRank",
        alt: "HackerRank",
        url: "https://www.hackerrank.com/certificates/8dc50c4fefda",
        role: "JavaScript (Intermediate)",
        skills: ["Design Patterns", "Memory management", "Concurrency Model", "Event Loops"],
        period: "May 2022 - No Expiry",
        logo: '/images/certs/hackerrank.png'
    },
    {
        title: "freeCodeCamp",
        alt: "freeCodeCamp",
        url: "https://www.freecodecamp.org/certification/fcca64b2bf4-bc47-4608-b18b-70ccc1e6a603/javascript-algorithms-and-data-structures",
        role: "JavaScript Algorithms and Data Structures",
        skills: ["Algorithms", "Data Structures", "Object Oriented Programming (OOP)", "Functional Programming"],
        period: "Aug 2021 - No Expiry",
        logo: '/images/certs/freecodecamp.jpeg'
    },
    {
        title: "TestDome",
        alt: "testdome",
        url: "https://www.testdome.com/cert/0f3aa2e7459b43fba857b18528944beb",
        role: "HTML/CSS, JavaScript, and React",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        period: "Jan 2020 - Jan 2023",
        logo: '/images/certs/testdome.png'
    }
];

const projectsList = [
    {
        title: "Portfolio Website v2",
        imageLight: '/images/projects/portfolio-website-v2.png',
        site: "https://harshtuwar.ml",
        description: `This is my personal portfolio website developed to showcase my skills, experiences and projects.`,
        techStack: ["NextJS", "ChakraUI", "JavaScript"]
    },
    {
        title: "HDrive - My personal cloud storage",
        imageLight: '/images/projects/hdrive.png',
        site: "https://drive.harshtuwar.ml",
        description: `HDrive is a file storage service which I developed to learn about the firebase.`,
        techStack: ["React", "Redux", "Firebase", "MaterialUI"]
    },
    {
        title: "WeCrypt",
        imageLight: '/images/projects/wecrypt.png',
        site: "https://wecrypt.vercel.app",
        description: `WeCrypt is a Web3 App that supports metamask pairing and interaction with the smart contract.`,
        techStack: ["React", "ContextAPI", "Solidity", "Vite", "Metamask", "Tailwind", "Ethers", "Hardhat", "Alchemy"]
    },
];

const bookTags = {
    'Favorites': { color: 'red.400', icon: HiOutlineHeart },
    'Reading': { color: 'purple.400', icon: BiGlasses },
    'Wishlist': { color: 'green.400', icon: FiShoppingBag },
    'Finished': { color: 'blue.400', icon: HiCheck }
};

export {
    NavbarItems,
    techStacks,
    SiteConfig,
    Resume,
    companies,
    educations,
    certifications,
    projectsList,
    bookTags,
};
