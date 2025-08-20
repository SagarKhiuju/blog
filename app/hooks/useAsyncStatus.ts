// import { useState } from "react";

// export function useAsyncStatus() {
//     const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//     const [errormessage, setErrorMessage] = useState<string | null>(null);

//     const start = () => {
//         setStatus('loading');
//         setErrorMessage(null);
//     }
//     const success = () => {
//         setStatus('success');
//         setErrorMessage(null);
//     }
//     const error = (message?: string) => {
//         setStatus('error');
//         setErrorMessage(message?? 'An error occurred');
//     }
//     const reset = () => {
//         setStatus('idle');
//         setErrorMessage(null);
//     }
//     const isLoading = status === 'loading';
//     const isSuccess = status === 'success';

//     return { status,errormessage, isLoading, isSuccess, start, success, error, reset };
// }