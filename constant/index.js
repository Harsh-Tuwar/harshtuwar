import { SiKotlin, SiFirebase, SiFastlane, SiGmail, SiTypescript, SiReact, SiMongodb, SiMaterialui, SiTailwindcss, SiRedux, SiPython, SiGooglecloud, SiMicrosoftazure, SiAmazon, SiMysql, SiGraphql, SiFlutter, SiVisualstudiocode, SiDocker, SiNodedotjs } from 'react-icons/si';
import { FaReact, FaJs, FaGitAlt, FaAndroid, FaJava, FaLinkedin, FaStackOverflow, FaMedium, FaGithub, FaAws } from "react-icons/fa";
import { CgAlbum } from "react-icons/cg";

const NavbarItems = [
    { name: "About Me", route: "/about" },
    { name: 'Projects', route: '/project' },
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
        title: "Qumon Intelligence",
        alt: "qumon image",
        url: 'https://www.qumonintelligence.com/',
        role: "Mobile Application Developer",
        skills: ["Kotlin", "Java", "Android", "Javascript", "React", "React Native"],
        period: "Aug 2020 - Present",
        logo: '/qumon.png'
    },
    {
        title: "TimeTec Cloud Sdn Bhd",
        alt: "timetec image",
        url: "https://www.timeteccloud.com/",
        role: "Mobile Application Developer Intern",
        skills: ["Java", "Android", "C#", "Appium Automation Testing", "AWS"],
        period: "Jul 2019 - Jan 2020",
        logo: '/timetec.png'
    }
]

const educations = [
    {
        title: "University Technology Malaysia (UTM)",
        alt: "utm image",
        url: 'https://www.utm.my/',
        role: "Bachelor's Degree in Computer Science (Network and Security)",
        skills: ["CGPA - 3.79", "CCNA", "Security Management", "Network Security"],
        period: "Sept 2016 - Sept 2020",
        logo: '/utm.png'
    },
    {
        title: "SMK Mentakab",
        alt: "smk image",
        url: 'https://www.facebook.com/pages/category/College---university/Sekolah-Menengah-Kebangsaan-Mentakab-224802077565350/',
        role: "STPM - Science Stream (Physics)",
        skills: ["CGPA - 3.33", "Math T", "Physics", "Chemistry"],
        period: "Jan 2015 - Jun 2016",
        logo: '/smk.png'
    },
]

const liveProjects = [
    {
        name: 'Chativo',
        imageUrl: 'https://play-lh.googleusercontent.com/tgLiP-ZL-sBuZt2RzDU1tN88Cp7NPbdjF7c0311_dui86f1HrAQM0j4gXaRE0pb5zW0=s360-rw',
        alt: 'chativo',
        summary: 'Enterprise ready live-chat base customer support & engagement software',
        playstore: 'https://play.google.com/store/apps/details?id=io.chativo.chat',
        appstore: 'https://apps.apple.com/us/app/chativo/id1545295884'
    },
    {
        name: 'ChativoV',
        imageUrl: 'https://play-lh.googleusercontent.com/5U5s7sSIuzP6CygPkU2ZYxyOXT-MKv7oiyweGKHgkEgVameOcYt44rnXqCTWZJNZgVqn=s360-rw',
        alt: 'chativo-v',
        summary: 'Live-chat specifically designed for visitors to communicate with real-time agent instantly',
        playstore: 'https://play.google.com/store/apps/details?id=io.chativo.visitor',
        appstore: 'https://apps.apple.com/us/app/chativov/id1595519177'
    }
]



export { NavbarItems, techStacks, SiteConfig, Resume, companies, educations, liveProjects }