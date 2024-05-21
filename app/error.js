'use client'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'

export default function GlobalError({ error, reset }) {
  const router = useRouter()
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="p-4 space-y-4 text-center bg-white rounded shadow-xl">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
            <p className="text-gray-500">{ error.message || 'Invalid Resource.'}</p>
            <Button
              onClick={() => router.push('/home')}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Return Home
            </Button>
          </div>
        </div>
        </>
  )
}