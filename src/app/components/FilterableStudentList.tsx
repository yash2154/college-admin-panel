// FilterableStudentList.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import DropDown from "./DropDown";
import StudentCard from "./StudentCard";

interface FilterFormInputs {
  name?: string;
  branch?: string;
  department?: string;
  rollNumber?: string;
  scholarNumber?: string;
  enrollmentNumber?: string;
  admissionYear?: number;
  leaveUniversity?: boolean;
  passOutYear?: number;
  mobileNumber?: string;
  emailAddress?: string;
  fatherName?: string;
  motherName?: string;
  residenceAddress?: string;
  parentContactNumber?: string;
  semester?: string;
  section?: string;
  subjectinHighSchool?: string;
  regular?: boolean;
  busFacility?: boolean;
  achievements?: string;
}

interface Student {
  scholarNumber: string;
  name: string;
  branch: string;
  department?: string;
  rollNumber?: string;
  enrollmentNumber?: string;
  admissionYear?: number;
  leaveUniversity?: boolean;
  passOutYear?: number;
  semester?: string;
  section?: string;
  subjectinHighSchool?: string;
  regular?: boolean;
  busFacility?: boolean;
  achievements?: string;
}
const FilterableStudentList: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FilterFormInputs>({
    defaultValues: {
      leaveUniversity: false,
      regular: false,
      busFacility: false,
    },
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FilterFormInputs> = async (filters) => {
    setLoading(true);
    setError(null);

    const filteredFiltersObj = filteredFilters(filters);
    console.log(filteredFiltersObj);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/students/get/filter",
        { filters: filteredFiltersObj }
      );
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch filtered students data");
      setLoading(false);
    }
  };

  const filteredFilters = (filters: FilterFormInputs) => {
    return Object.keys(filters).reduce((acc, key) => {
      const value = filters[key as keyof FilterFormInputs];
      if (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        value !== false
      ) {
        (acc as any)[key] = value;
      }
      return acc;
    }, {} as Partial<FilterFormInputs>);
  };

  return (
    <div className="h-[89vh] w-[85vw] bg-gray-900 overflow-auto">
      <div className="w-full md:w-[80%]   justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900 mt-6 p-6">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-center text-gray-300">
            Filter <span className="text-blue-500">Students</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className=" w-[40vw] ">
            {/* Text Inputs */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Name</span>
              </label>
              <input
                {...register("name")}
                className="w-full input input-bordered h-10"
              />
            </div>

            <DropDown
              name="branch"
              label="Branch"
              options={[
                "",
                "BCA",
                "BSC",
                "BBA",
                "BCOM",
                "BA",
                "MCA",
                "BTech",
                "MBA",
              ]}
              register={register}
            />
            <DropDown
              name="department"
              label="Department"
              options={[
                "",
                "School of Computer Science",
                "School of Management",
                "School of Commerce",
                "School of Fashion",
                "School of LAW",
              ]}
              register={register}
            />
            <DropDown
              name="semester"
              label="Semester"
              options={[
                "",
                "1st",
                "2nd",
                "3rd",
                "4th",
                "5th",
                "6th",
                "7th",
                "8th",
              ]}
              register={register}
            />
            <DropDown
              name="section"
              label="Section"
              options={["", "A", "B", "C", "D", "E", "F", "G", "h"]}
              register={register}
            />
            <DropDown
              name="subjectinHighSchool"
              label="Subject in High School"
              options={[
                "",
                "Commerce with CS",
                "Commerce with math",
                "PCM",
                "PCB",
                "PCBM",
              ]}
              register={register}
            />

            {/* Other Inputs */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Roll Number
                </span>
              </label>
              <input
                {...register("rollNumber")}
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Scholar Number
                </span>
              </label>
              <input
                {...register("scholarNumber")}
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Enrollment Number
                </span>
              </label>
              <input
                {...register("enrollmentNumber")}
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Admission Year
                </span>
              </label>
              <input
                type="text"
                {...register("admissionYear")}
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Leave University
                </span>
              </label>
              <input
                type="checkbox"
                {...register("leaveUniversity")}
                className="checkbox checkbox-primary"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Pass Out Year
                </span>
              </label>
              <input
                type="text"
                {...register("passOutYear")}
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Regular</span>
              </label>
              <input
                type="checkbox"
                {...register("regular")}
                className="checkbox checkbox-primary"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Bus Facility
                </span>
              </label>
              <input
                type="checkbox"
                {...register("busFacility")}
                className="checkbox checkbox-primary"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Achievements
                </span>
              </label>
              <input
                {...register("achievements")}
                className="w-full input input-bordered h-10"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button type="submit" className="btn btn-primary">
                Filter
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Display the filtered students */}
        <div className="w-full mt-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && students.length === 0 && (
            <p>No students found.</p>
          )}
          {!loading && !error && students.length > 0 && (
            <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900 mt-6 p-6">
              <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
                Student <span className="text-blue-500">List</span>
              </h1>
              {students.map((student) => (
                <StudentCard key={student.scholarNumber} student={student} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterableStudentList;
