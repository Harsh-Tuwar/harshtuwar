interface IAccount {
	url: string;
	id: string;
	name: string;
	type: string;
};

interface IAuthor {
	name: string;
	accounts: IAccount[];
};

interface ISiteConfig {
	copyright: string;
	author: IAuthor;
}

export const NavbarItems = [
	{ name: 'Home', route: '/' },
	{ name: 'About Me', route: '/about' },
	{ name: 'Contact', route: '/contact' },
];

export const DropdownLinks = [
	{ name: 'Books', route: '/books' },
	{ name: 'Projects', route: '/projects' },
];

export const SiteConfig: ISiteConfig = {
	copyright: `Copyright © ${new Date().getFullYear()} Harsh Tuwar. All Rights Reserved.`,
    author: {
        name: "Harsh Tuwar",
        accounts: [
            {
                url: "https://github.com/harsh-tuwar",
                name: "Github",
				type: "gray",
				id: 'github'
            },
            {
                url: "https://www.linkedin.com/in/tuwar08",
                id: 'linkedin',
                name: "Linkedin",
                type: "linkedin"
            },
            {
                url: "mailto:tuwarharsh08@gmail.com",
                id: 'gmail',
                name: "Gmail",
                type: "red"
            }
        ]
    }
}