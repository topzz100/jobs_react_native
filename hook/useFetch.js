import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
};
