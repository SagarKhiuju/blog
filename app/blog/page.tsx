'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const BlogPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`,
      { cache: 'no-store', },
    )
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Blog</h1>
      {articles.length === 0 && <p>No articles found.</p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {articles.map((article: any) => (
          <li key={article.id} className="flex border rounded overflow-hidden shadow-sm p-4">
            <Link href={`/blog/${article.slug}`} className="flex w-full">
              {article.imageUrl && (
                <div className="relative w-1/3 h-40">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className='p-4 w-2/3 flex flex-col justify-center'>
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600">{article.content.slice(0, 100)}...</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage