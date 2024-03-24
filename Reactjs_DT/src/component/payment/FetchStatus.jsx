import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState({ status: 0, message: 0 });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw Error('');
          }

          return res.json();
        })
        .then(data => {
          setData(data);
          setIsPending(!isPending);
          setError(null);
        })
        .catch(err => {
          setIsPending(false);
          setError(err.message);
        });
    }, 5000)
  }, [url]);

  return { data, isPending, error };
}

export default useFetch;