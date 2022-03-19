import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (url && !url.includes("undefined")) {
      const fetchData = async (url: string) => {
        try {
          const response = await axios(url);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(url);
    }
  });

  return { data, loading };
};

export default useFetch;
