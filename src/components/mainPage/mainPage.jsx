import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { GITHUBAPI } from '../../constants/constants.js';

import { allDataLoading, allDataReceived, filterRepos } from "../../store/Main/MainSlice";
import InfoPage from "../infoPage/infoPage";

const MainPage = () => {
  const [username, setUsername] = useState();
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  const invokeAllDataAPI = async () => {
    dispatch(allDataLoading());
    let endpoints = [
      `${GITHUBAPI}${username}`,
      `${GITHUBAPI}${username}/repos`,
    ];
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((data) => {
      const dataFromApi = {
        user: {
          login: data[0].data.login,
          followers: data[0].data.followers,
          blog: data[0].data.blog,
          name: data[0].data.name,
          public_repos: data[0].data.public_repos
        },
        repos: data[1].data,
      };

      dispatch(filterRepos(filterLanguage(data[1].data)));
      dispatch(allDataReceived(dataFromApi));
      setActive(true);
    });
  };
  const filterLanguage = (data) => {
    const dataLanguage = [];
    data.filter(item => dataLanguage.push(item.language));
    const result = dataLanguage.reduce((acc, val) => {
      if (val !== null) {
        const index = acc.findIndex(el => el.name === val);
        if (index !== -1) {
          acc[index].count++;
        } else {
          acc.push({ name: val, count: 1 });
        }
      }
      return acc;
    }, []);
    
    const totalCount = result.reduce((acc, el) => acc + el.count, 0);
    
    const resultWithPercentages = result.map(el => {
      return {
        ...el,
        percentage: ((el.count / totalCount) * 100).toFixed(0) + "%"
      };
    });

    return resultWithPercentages;
  }
  return (
    <>
      {isActive ? (
        <InfoPage />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
            <div className="text-center m-8 font-mono text-2xl">MY GITHUB RÉSUMÉ</div>
            <form
              className="grid grid-cols-6"
              onSubmit={(event) => {
                event.preventDefault();
                invokeAllDataAPI();
              }}
            >
              <Input
                className="col-span-5"
                placeholder="Enter your GitHub username"
                required
                sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>
                <Button type="submit">GENERATE</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
