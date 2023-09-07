import { useState } from "react";
import SearchableSelect from "../../components/SearchableSelect";
import styles from "./styles.module.css";
import ExperienceInput from "../../components/ExperienceInput";
import missionsApi from "../../api/missionsApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import appRouteNameConstants from "../../constants/routes";

export default function CreateMissionPage() {
  const [name, setName] = useState("");
  const [resumeFolderLink, setResumeFolderLink] = useState("");
  const [selectionCriteria, setSelectionCriteria] = useState("");
  const [experience, setExperience] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [error, setError] = useState("");
  const [apiInProgress, setApiInProgress] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState<Array<any>>([]);

  const navigate = useNavigate();

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    console.log("on name change: ", value);
  };

  const handleResumeFolderChange = (e: any) => {
    const value = e.target.value;
    setResumeFolderLink(value);
    console.log("on folder change: ", value);
  };

  const handleExperienceChange = (exp: any) => {
    console.log("on exp change: ", exp);
    setExperience(exp);
  };

  const handleSelectionCriteriaChange = (e: any) => {
    const value = e.target.value;
    console.log("on selection change: ", value);
    setSelectionCriteria(value);
  };

  const handleMinCGPA = (e: any) => {
    const value = e.target.value;
    console.log("on min cgpa: ", value);
    setMinCGPA(value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateValues()) {
      setApiInProgress(true);
      missionsApi
        .postMission({
          name: name,
          resumeFolderLink: resumeFolderLink,
          skills: selectedSkills,
          totalExp: experience,
          minCGPA: minCGPA,
          selectionCriteria: selectionCriteria,
        })
        .then((resp) => {
          navigate(appRouteNameConstants.HOME);
        })
        .catch((err: any) => {
          setError(err.message);
          console.log("Error in api:", err);
        })
        .finally(() => {
          setApiInProgress(false);
        });
    }
  };

  const onSkillSelect = (option: string) => {
    console.log("selected: option", option);
    setSelectedSkills([...selectedSkills, option]);
  };

  const onSkillRemove = (option: string) => {
    setSelectedSkills(
      selectedSkills.filter(
        (_option) => _option.toLowerCase() !== option.toLowerCase()
      )
    );
  };

  const validateValues = () => true;

  return (
    <div className="flex flex-col items-center justify-center createMission p-[16px]">
      <h1 className="text-[30px] font-semibold text-[#001C30]">Create Mission</h1>
      <form
        onSubmit={onSubmit}
        className="gap-[30px] mt-[50px] w-[500px] max-w-[500px]"
      >
        <div className="relative h-10 w-full min-w-[300px] my-[18px]">
          <input
            required
            value={name}
            onChange={handleNameChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Enter mission name
          </label>
        </div>
        <div className="relative h-10 w-full min-w-[300px] my-[18px]">
          <input
            required
            value={resumeFolderLink}
            onChange={handleResumeFolderChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-[#643246] outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Resume folder URL
          </label>
        </div>
        <div>
          <SearchableSelect
            selectedOptions={selectedSkills}
            onOptionSelect={onSkillSelect}
          />
          {selectedSkills.length > 0 && (
            <>
              <b>Selected Skills:</b>
              <div className={`${styles.skillsContainer}`}>
                {selectedSkills.map((skill, idx) => (
                  <div key={idx} className={`${styles.skillContainer}`}>
                    <span className={`${styles.skillText}`}>{skill}</span>
                    <img
                      onClick={() => onSkillRemove(skill)}
                      className={`${styles.skillBtn}`}
                      src="/icons8-cancel-26.png"
                      alt="cross"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          <ExperienceInput onChange={handleExperienceChange} />
        </div>
        <div className="relative h-10 w-full min-w-[300px] my-[18px]">
          <input
            value={minCGPA}
            min={0}
            max={10}
            type="number"
            onChange={handleMinCGPA}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Min. CGPA (out of 10)
          </label>
        </div>
        <div className="relative h-[100px] w-full min-w-[300px] my-[18px]">
          <textarea
            value={selectionCriteria}
            onChange={handleSelectionCriteriaChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Custom selection criteria
          </label>
        </div>

        <div className={`${styles.btnContainer}`}>
          {apiInProgress ? (
            <Loader />
          ) : (
            <input
              className="bg-[#001C30] mt-[8px] text-[#fff] border-2 text-[16px] font-semibold px-[1rem] py-[0.5rem] inline-block hover:bg-transparent hover:border-[#001C30] hover:text-[#001C30] transition tracking-wider"
              name="Submit"
              type="submit"
            />
          )}
        </div>
        {!apiInProgress && <h4 className={`${styles.errorTxt}`}>{error}</h4>}
      </form>
    </div>
  );
}
