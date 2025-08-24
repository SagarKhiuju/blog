'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import axios from 'axios';


// Validation schema
const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    image: z
        .any()
        .optional()
        .refine(
            (file) => 
                !file?.length || ['image/jpeg', 'image/png', 'image/webp'].includes(file[0]?.type),
            'Only JPG, PNG, or WEBP images are allowed'
        ),


});

type FormData = z.infer<typeof schema>;

const AddBlog = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const watchImage = watch('image');

    useEffect(() => {
        if (watchImage && watchImage.length > 0) {
            const file = watchImage[0];
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    }, [watchImage]);

    const onSubmit = async (data: FormData) => {

        setErrorMessage(null);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        try {
            await axios.post('/api/blog', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setUploadProgress(percentCompleted);
                },
            });
            reset();
            setUploadProgress(0);
            setErrorMessage(null);
            setSuccessMessage('Blog added successfully!');

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'Validation error.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
            setUploadProgress(0);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Add Blog
                </h1>

                {errorMessage && (
                    <div className="mb-4 text-red-600 bg-red-100 p-4 rounded-md w-full">
                        <p>Error: {errorMessage}</p>
                    </div>
                )}

                {successMessage && (<div className="mb-4 text-green-600 bg-green-100 p-4 rounded-md w-full">
                    <p>{successMessage}</p>
                </div>
                )}

                {/* Title */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="title"
                    >
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Enter blog title"
                    />
                    {errors.title?.message && (
                        <p className="text-red-600 text-sm">{String(errors.title.message)}</p>
                    )}
                </div>

                {/* Content */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="content"
                    >
                        Content:
                    </label>
                    <textarea
                        id="content"
                        rows={4}
                        {...register('content')}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Write the blog content here"
                    />
                    {errors.content?.message && (
                        <p className="text-red-600 text-sm">
                            {String(errors.content.message)}
                        </p>
                    )}
                </div>

                {/* Image */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="image"
                    >
                        Image:
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        disabled={isSubmitting}
                        className="w-full text-gray-600"
                    />
                    {errors.image?.message && (
                        <p className="text-red-600 text-sm">{String(errors.image.message)}</p>
                    )}
                    {previewImage && (
                        <div className="mt-4">
                            <p className="text-gray-700 mb-2">Preview:</p>
                            <Image src={previewImage} alt="Preview" width={150} height={150} />
                        </div>
                    )}
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                    <div className="mb-4 w-full bg-gray-200 h-2 rounded">
                        <div
                            className="bg-blue-600 h-2 rounded"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white font-semibold py-3 rounded-md transition duration-300 ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting ? 'Adding...' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
export { schema };