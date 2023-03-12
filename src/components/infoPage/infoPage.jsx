import { useSelector } from "react-redux";
import ReposBlock from "../reposBlock/reposBlock";
const InfoPage = () => {
  const { user, repos } = useSelector((state) => state.reducer.data);
  const { language } = useSelector((state) => state.reducer);

  const languageBlock = language.map((item, index) => {
    return (
      <div className="language" key={index}>
        {item.name}: {item.percentage}
      </div>
    );
  });

  return (
    <>
      <div className="flex justify-center font-mono text-xl mt-5">
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg  p-20">
          <div className="info">
            <div className="text-4xl  border-b-2  border-indigo-600 pb-4">
              {user.name}
            </div>
            <div className="grid grid-cols-8 mt-5 border-b-2  border-indigo-600 mb-5 pb-5">
              <div className="col-start-1">Github profile:</div>
              <div className="col-start-2 col-end-8">
                <div className="">
                  On GitHub since 2019, {user.name} is developer based in{" "}
                  {user.location} with {repos.length} public repositories and{" "}
                  {user.followers} followers.
                </div>
              </div>
            </div>
            {user.blog ? <div className="grid grid-cols-8 mt-5 border-b-2  border-indigo-600 mb-5 pb-5">
              <div className="col-start-1">Website:</div>
              <div className="col-start-2 col-end-8">
                <div className="">
                  <a href={user.blog}>{user.blog}</a>
                </div>
              </div>
            </div> : ''}
          </div>
          <div className="grid grid-cols-8 mt-5 border-b-2  border-indigo-600 mb-5 pb-5">
            <div className="col-start-1">Languages:</div>
            <div className="col-start-2 col-end-8 grid grid-cols-3">
              {languageBlock}
            </div>
          </div>
          <div className="mt-5 mb-2">
            Repos: {user.public_repos} Followers: {user.followers}
          </div>
          <div className="repos">
            <ReposBlock data={repos} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
