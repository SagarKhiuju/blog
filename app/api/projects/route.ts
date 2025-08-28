import {prisma} from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const projectUrl = formData.get('projectUrl') as string;
        const file = formData.get('image') as File | null;

        if (!title || !description || !projectUrl) {
            return new Response(JSON.stringify({message: 'Title, description, and project URL are required.'}), {status: 400});
        }

        let imageUrl: string | undefined = undefined;

        if (file && file.size > 0) {
            // Ensure uploads folder exists
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, {recursive: true});
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + '-' + file.name;
            const filePath = path.join(uploadDir, filename);

            fs.writeFileSync(filePath, buffer);
            imageUrl = '/uploads/' + filename;
        }

        const slug = slugify(title, {lower: true, strict: true});

        const project = await prisma.projects.create({
            data: {
                title,
                content: description,
                projectUrl,
                imageUrl,
                slug,
            },
        });

        return new Response(JSON.stringify(project), {status: 201});
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({message: 'Internal server error.'}), {status: 500});
    }
}