import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import DropDown from "../ui/DropDown";
import StudentCard from "./StudentCard";
import Modal from "react-modal";

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
  achivements?: string;
}

interface Student {
  scholarNumber: string;
  name: string;
  branch: string;
  department?: string;
  mobileNumber: string;
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
  achivements?: string;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const onSubmit: SubmitHandler<FilterFormInputs> = async (filters) => {
    setLoading(true);
    setError(null);

    const filteredFiltersObj = filteredFilters(filters);
    console.log(filteredFiltersObj);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_PORT + "/api/students/get/filter",
        { filters: filteredFiltersObj },
        {
          withCredentials: true,
        }
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

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalIsOpen(false);
  };

  return (
    <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] bg-zinc-900 overflow-auto">
      <div className="w-full md:w-[80%] justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-zinc-900 mt-6 p-6">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-center text-gray-300">
            Filter <span className="text-blue-500">Students</span>
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-[40vw] w-[70vw]"
          >
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
                "BARCH",
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
                "School of ARTS",
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
                {...register("achivements")}
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
            <p className="text-white">No students found.</p>
          )}
          {!loading && !error && students.length > 0 && (
            <div className="flex flex-col gap-1">
              {students.map((student) => (
                <div
                  key={student.scholarNumber}
                  onClick={() => openModal(student)}
                  className="p-4 bg-zinc-800  cursor-pointer flex flex-row gap-5 justify-self-stretch"
                >
                  <div className=" flex flex-row gap-2">
                    <p className="text-xl font-semibold text-blue-600">
                      {student.name}
                    </p>
                  </div>
                  <div className=" flex flex-row gap-2">
                    <span className=" hidden md:block text-lg font-bold text-white">
                      Branch:
                    </span>

                    <p className="text-lg text-white">{student.branch}</p>
                  </div>

                  <div className=" flex flex-row gap-2">
                    <span className="  hidden md:block text-lg font-bold text-white">
                      scholarNumber:
                    </span>
                    <p className="text-lg text-white">
                      {student.scholarNumber}
                    </p>
                  </div>
                  <div className=" hidden md:flex flex-row gap-2">
                    <span className=" hidden md:block text-lg font-bold text-white">
                      mobileNumber:
                    </span>

                    <p className="text-lg text-white">{student.mobileNumber}</p>
                  </div>
                  {student.leaveUniversity && (
                    <p className="text-red-500">❌</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="flex justify-center items-center overflow-auto"
        overlayClassName="fixed inset-0 bg-neutral-950 bg-opacity-75  overflow-auto"
      >
        {selectedStudent && (
          <div className="bg-neutral-950 p-6 rounded-lg shadow-lg">
            <StudentCard student={selectedStudent} />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FilterableStudentList;
