import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(process.env.API_URL || 'http://localhost:4000/' + url, {
          method,
          body,
          headers: { ...headers },
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (responseData?.message) {
          toast('Operation Successful.')
        }
        setIsLoading(false);
        return responseData.data;
      } catch (err) {
        console.log({ err })
        toast(err.message)
        setError(err.message);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
