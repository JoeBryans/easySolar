import axios from "axios";

export const FetchEstimate = async () => {
  try {
    const res = await axios.get("/api/estimate");
    const { data } = res;
    console.log("data", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
