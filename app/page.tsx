'use client';
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../components/SocialIcons";
import AnimatedSection from "../components/AnimatedSection";
import { useEffect, useState } from "react";

export default function Home() {

  const [featuredArticle, setFeaturedArticle] = useState<any | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) return; // handle empty array

        const featuredIndex = Math.floor(Math.random() * data.length);
        const featured = data[featuredIndex];
        const others = data.filter((_, i) => i !== featuredIndex).slice(0, 3);

        setFeaturedArticle(featured);
        setArticles(others);
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Intro Section */}
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

      <section className="container mx-auto px-6 pb-16 md:px-10 md:pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Featured Article */}
        <AnimatedSection delay={0.6}>
          <div className="bg-[#190e23] p-6 md:p-10 rounded-xl shadow-lg h-full">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Article</h2>
            {featuredArticle ? (
              <Link href={`/blog/${featuredArticle.slug}`} className="block">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-xl font-semibold line-clamp-1 md:line-clamp-4">{featuredArticle.title}</h3>
                <p className="text-gray-300 mt-2 line-clamp-2 md:line-clamp-8">{featuredArticle.content ?? "No content"}...</p>
              </Link>
            ) : (
              <p className="text-gray-400">Loading featured article...</p>
            )}
          </div>
        </AnimatedSection>
        {/*Random Article*/}
        <AnimatedSection delay={0.8}>
          <div className="bg-gradient-to-b from-black to-red-600 p-6 md:p-10 rounded-xl shadow-lg h-full">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Recommended Articles</h2>
            {articles.map((article) => (
              <div key={article.id} className="flex border rounded overflow-hidden shadow-sm p-4 mb-4">
                <Link href={`/blog/${article.slug}`} className="flex w-full">
                  {article.imageUrl && (
                    <div className="relative w-1/3 h-24">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className='p-4 w-2/3 flex flex-col justify-center'>
                    <h3 className="text-lg font-semibold line-clamp-2 md:line-clamp-3">{article.title}</h3>
                    <p className="text-gray-300 line-clamp-2 md:line-clamp-3">{article.content ?? "No content"}...</p>
                  </div>
                </Link>
              </div>
            ))}
            <div className="text-left md:text-right mt-4">
              <Link
                href="/blog"
                className="inline-block bg-white/90 text-red-700 hover:bg-gray-100 rounded-lg shadow transition px-4 py-2"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}