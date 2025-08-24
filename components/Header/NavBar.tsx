'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaCat } from "react-icons/fa"
import { FiMenu, FiX } from "react-icons/fi" // icons for open/close

const NavBar = () => {
    const currentPath = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Skills', href: '/skills' },
        { label: 'Projects', href: '/projects' },
        { label: 'Resume', href: '/resume' },
        { label: 'About', href: '/about' },
    ]


    return (
        <nav className="sticky top-0 z-50 flex flex-wrap justify-between items-center gap-x-6 px-6 md:px-12 lg:px-24 h-20 bg-[#190e23]">
            {/* Hamburger button (mobile only) */}
            <button
                className="md:hidden text-white text-3xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>


            {/* Logo */}
            <Link href="/">
                <FaCat className="text-red-400 text-3xl md:text-4xl" />
            </Link>

            {/* Links */}
            <ul className={`flex-col md:flex md:flex-row md:space-x-6 absolute md:static bg-[#190e23] left-0 w-full md:w-auto transition-all duration-300 ease-in-out 
         ${isOpen ? "top-20 opacity-100"  : "top-[-500px] opacity-0 md:opacity-100 "}`}>
                {links.map((link) => (
                    <li key={link.href} className="text-center py-2 md:py-0">
                        <Link
                            href={link.href}
                            className={`${link.href === currentPath ? 'text-red-500' : 'text-white hover:text-red-300'} transition-colors`}
                            onClick={() => setIsOpen(false)} // closes menu on click (mobile)
                        >
                            {link.label}
                        </Link>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}

export default NavBar