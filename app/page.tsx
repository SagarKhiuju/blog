import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../components/SocialIcons";
import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black via-red-900 to-red-600 py-20 md:py-32 text-center">
        <AnimatedSection>
          <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
            <Image
              src="/pexels-mohammed-fawas-2154557562-33286778.jpg"
              alt="Profile photo of Some Chud"
              fill
              className="rounded-full object-cover border-4 border-white"
              priority // Important: loads quickly since it's above the fold
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Some Chud</h1>
          <p className="text-xl md:text-2xl text-red-200">Fullstack Developer</p>
        </div>
        </AnimatedSection>
      </section>

      {/* About & Contact Section */}
      <section className="container mx-auto px-6 py-16 md:px-10 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* About Me */}
        <AnimatedSection delay={0.2}>
          <article className="bg-[#190e23] p-6 md:p-10 rounded-xl shadow-lg h-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            I am a fullstack developer with a passion for creating dynamic and responsive web applications. 
            I enjoy working with the latest technologies and continuously improving my skills.
          </p>
        </article>
        </AnimatedSection>

        {/* Contact Info */}
        <AnimatedSection delay={0.4}>
          <div className="bg-gradient-to-b from-black to-red-600 p-6 md:p-10 rounded-xl shadow-lg h-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Find Me Here</h2>
          <p className="text-lg leading-relaxed">
            Want to say hi?{" "}
            <Link
              href="mailto:mailexample@example.com"
              className="text-red-400 hover:text-red-100 underline transition"
            >
              mailexample@example.com
            </Link>
          </p>
          <div className="mt-6">
            <p className="text-lg mb-4">Or connect with me on:</p>
            <SocialIcons />
          </div>
        </div>
        </AnimatedSection>
      </section>

      <section>
        <AnimatedSection delay={0.6}>
          <div>
            
          </div>
          </AnimatedSection> 
      </section>
    </div>
  );
}