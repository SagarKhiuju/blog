import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const file = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(JSON.stringify({ message: 'Title and content are required.' }), { status: 400 });
    }

    let imageUrl: string | undefined = undefined;

    if (file && file.size > 0) {
      // Ensure uploads folder exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + '-' + file.name;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
      imageUrl = '/uploads/' + filename;
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        imageUrl: imageUrl ?? null,
      },
    });

    return new Response(JSON.stringify(news), { status: 201 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
