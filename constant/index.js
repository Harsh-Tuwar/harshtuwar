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
    SiPostgresql,
    SiMicrosoftazure,
    SiMysql,
    SiGraphql,
    SiFlutter,
    SiVisualstudiocode,
    SiDocker,
    SiNodedotjs,
    SiApachekafka,
    SiApachepulsar,
} from 'react-icons/si';
import { FaJs, FaGitAlt, FaLinkedin, FaGithub, FaAws } from "react-icons/fa";
import { CgAlbum } from "react-icons/cg";
import { HiOutlineHeart, HiCheck } from "react-icons/hi";
import { BiGlasses } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";

const NavbarItems = [
    { name: "Home", route: "/" },
    { name: "About Me", route: "/about" },
    { name: "Contact", route: "/contact" },
];

const DropDownLinks = [
    { name: 'Books', route: '/books' },
    { name: 'Projects', route: '/projects'},
];
  
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
        name: 'PostgreSQL',
        icon: <SiPostgresql fontSize={'20px'} />
    },
    {
        name: "MongoDB",
        icon: <SiMongodb fontSize="20px" />,
    },
    {
        name: "Firebase",
        icon: <SiFirebase fontSize="20px" />,
    },
    {
        name: "Kafka",
        icon: <SiApachekafka fontSize="20px" />
    },
    {
        name: "Pulsar",
        icon: <SiApachepulsar fontSize='20px' />
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

const projectsList = [
    {
        title: "Tasko - A Task Management Software",
        imageLight: '/images/projects/tasko.png',
        site: "https://mytasko.vercel.app",
        description: `Tasko is a task management software to collaborate, manage projects and reach new productivity peaks.`,
        techStack: ["React", "NextJS 14", "Server Actions", "MySQL", "Prisma", "Stripe", "Tailwind CSS"]
    },
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
];

const bookTags = {
    'Favorites': { color: 'red.400', icon: HiOutlineHeart },
    'Reading': { color: 'purple.400', icon: BiGlasses },
    'Wishlist': { color: 'green.400', icon: FiShoppingBag },
    'Finished': { color: 'blue.400', icon: HiCheck }
};

export {
    NavbarItems,
    DropDownLinks,
    techStacks,
    SiteConfig,
    Resume,
    projectsList,
    bookTags,
};
