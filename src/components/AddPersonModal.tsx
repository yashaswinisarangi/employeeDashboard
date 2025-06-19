import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPersonModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [jobTitles, setJobTitles] = useState([""]);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleAddJobTitle = () => {
    setJobTitles([...jobTitles, ""]);
  };

  const handleJobTitleChange = (index: number, value: string) => {
    const updated = [...jobTitles];
    updated[index] = value;
    setJobTitles(updated);
  };

  const isContactValid = /^\d{10}$/.test(contact);
  const isEmailValid = /^[^\s@]+@optum\.com$/.test(email);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[75%] max-w-xl h-[85vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-orange-600 font-bold"> Add Employee Details </h2>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">&times;</button>
        </div>

        <div className="overflow-y-auto pr-2">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y divide-x gray-300 rounded-md">
            <input type="text" placeholder="UCMG/PRJ Core Alignment" className="input" />
            <input type="text" placeholder="Manager" className="input" />
            <input type="text" placeholder="Emp ID" className="input" />
            <input type="text" placeholder="Resource Name" className="input" />
            <input type="date" className="input" placeholder="Hire/Term Date" />
            <input type="text" placeholder="Core Team" className="input" />
            <input type="text" placeholder="Secondary Team" className="input" />
            <select className="input ">
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="Active">Active</option>
              <option value="Term">Term</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input type="text" placeholder="Vendor" className="input" />
            <input
              type="email"
              placeholder="Email ID (@optum.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input ${email && !isEmailValid ? "border-red-500" : ""}`}
            />
            <input
              type="text"
              placeholder="Contact #"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`input ${contact && !isContactValid ? "border-red-500" : ""}`}
            />

            <div className="col-span-2">
              <label className="text-sm font-medium">Job Title / Skill Set</label>
              <div className="max-h-[120px] overflow-y-auto space-y-2 mt-1 pr-2">
                {jobTitles.map((title, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleJobTitleChange(index, e.target.value)}
                      className="input h-9 p-2 flex-1"
                      placeholder={`Skill ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (jobTitles.length > 1) {
                          const updated = [...jobTitles];
                          updated.splice(index, 1);
                          setJobTitles(updated);
                        }
                      }}
                      className="text-red-500 text-sm font-bold"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddJobTitle}
                className="text-orange-600 text-sm font-medium mt-2"
              >
                + Add More
              </button>
            </div>
            <select className="input">
              <option value="">Select Role Type</option>
              <option value="Eng">Engineering</option>
              <option value="Non-Eng">Non-Engineering</option>
              <option value="Both">Both</option>
            </select>
            <input type="text" placeholder="Base Location" className="input" />
          </form>
        </div>

        <div className="flex justify-end mt-4 border-t pt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
            disabled={!isContactValid || !isEmailValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;