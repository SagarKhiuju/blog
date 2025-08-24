import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import React from 'react'

interface Props{
    params: { slug: string };
}

const ArticlePage = async ({ params }: Props) => {
  const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    const article = await prisma.news.findUnique({
        where: { slug },
    });

    if (!article) {
        return <div>Article not found</div>;
    }
    
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-white">{article.title}</h1>
      {article.imageUrl && (
        <div className="relative w-full h-80 mb-4">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <p className="text-gray-300">{article.content}</p>
    </div>
  )
}

export default ArticlePage