import React from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface SocialIconsProps {
    name: string;
    url: string;
    icon: React.ReactNode;
    hoverColor: string;
}

const SocialIcons = () => {
    const socialLinks: SocialIconsProps[] = [
        {
            name: 'GitHub',
            url: 'https://github.com',
            icon: <FaGithub />,
            hoverColor: 'bg-gray-800'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com',
            icon: <FaLinkedin />,
            hoverColor: 'bg-blue-600'
        }
    ]
    return (
        <div className='flex flex-wrap justify-between items-center gap-6 p-6'>
            {socialLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    className="group relative flex items-center gap-3 hover:bg-grey-800/20 rounded-lg p-2 transition-all duration-300"
                    aria-label={`Visit ${link.name} profile`}
                >
                    <div className='relative flex items-center justify-center w-12 h-12'>
                        {/* Yellow Circle Background */}
                    <div className="absolute inset-0 w-full h-full bg-yellow-400 rounded-full transition-all duration-300 ease-in-out group-hover:scale-0 group-hover:opacity-0" />

                    {/* Icon */}
                    <div className={`relative z-10 text-white text-xl transition-all duration-300 ease-in-out group-hover:scale-150 ${link.hoverColor}`}>
                        {link.icon}
                    </div>
                    </div>

                    {/* Optional: Tooltip */}
                    <span className="hidden md:block text-white text-lg font-medium transition-colors duration-300 group-hover:text-yellow-400">
                        {link.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default SocialIcons