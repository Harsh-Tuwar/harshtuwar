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
        title: "Brane Inc.",
        alt: "brane image",
        url: 'https://www.brane.ca/',
        role: "Software Developer",
        skills: ["TypeScript", "JavaScript", "React", "MeteorJS", "Docker", "Azure", "NodeJS", "Express", "Github"],
        period: "Sept 2021 - Present",
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
    },
    {
        title: "TestDome",
        alt: "testdome",
        url: "https://www.testdome.com/cert/e6b172cc381e4fc8aa4be38f899a2fbe",
        role: "React",
        skills: ["React"],
        period: "Jan 2020 - Jan 2023",
        logo: '/images/certs/testdome.png'
    },
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
        techStack: ["React", "Redux", "Firbase", "MaterialUI"]
    },
];

const currentlyReading = {
    id: '0',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
    state: 'READING',
    link: ''
};

const favReadings = [
    {
        id: '0',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'FAV',
    },
    {
        id: '1',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'FAV',
    },
    {
        id: '2',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'FAV',
    },
    {
        id: '3',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'FAV',
    },
    {
        id: '4',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'FAV',
    }
];


const wishlistReading = [
    {
        id: '0',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'WISH',
    },
    {
        id: '1',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'WISH',
    },
    {
        id: '2',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'WISH',
    },
];


const doneReading = [
    {
        id: '0',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'DONE',
    },
    {
        id: '1',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        cover: 'https://www.colorbook.io/imagecreator.php?hex=1168A6&width=1920&height=1080&text=book',
        state: 'DONE',
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
    currentlyReading,
    favReadings,
    wishlistReading,
    doneReading
};
