// import axios from "axios";
// import { useEffect, useState } from "react";
// // import { RAPID_API_KEY } from "@env";

// // const rapidApiKey = RAPID_API_KEY;

// const useFetch = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://jsearch.p.rapidapi.com/search`,
//     params: {
//       query: "Python developer in Texas, USA",
//       page: "1",
//       num_pages: "1",
//     },
//     headers: {
//       "X-RapidAPI-Key": "0a82f88e3emsh30ce09c2d4507a4p1aa16djsnbe91ed4b6213",
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//   };
//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.request(options);
//       console.log(response);
//       setData(response.data.data);
//       setIsLoading(false);
//       setError(null);
//     } catch (error) {
//       setError(error);
//       console.log(error);
//       alert("There is an error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };
// export default useFetch;
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "0a82f88e3emsh30ce09c2d4507a4p1aa16djsnbe91ed4b6213",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      query: "Python developer in Texas, USA",
      page: "1",
      num_pages: "1",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
