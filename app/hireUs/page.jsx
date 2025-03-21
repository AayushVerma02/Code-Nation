"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gratitude from "../components/Gratitude";
const HireUs = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "Website Development",
    description: "",
    budget: "",
    deadline: "",
    additionalNotes: "",
    email: "",
    phone: "",
    files: [],
  });

  const [show, setShow] = useState(false);

  // We store the names of missing fields here, if any
  const [missingFields, setMissingFields] = useState([]);

  // This controls whether to show an error alert
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Generic text/select/textarea handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File upload handler
  const handleFileChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, files: [...e.target.files] }));
  }, []);

  // Validation function checks if any required field is empty
  const validateForm = () => {
    const requiredFields = [
      "projectName",
      "projectType",
      "description",
      "budget",
      "deadline",
      "additionalNotes",
      "email",
      "phone",
    ];
    const missing = [];
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        missing.push(field);
      }
    }
    return missing;
  };

  // On submit, we either log the data or show an error
  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = validateForm();
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowErrorAlert(true);
    } else {
      console.log("Form Data:", formData);
      setMissingFields([]);
      setShowErrorAlert(false);
      setShow(true);
      // document.body.style.overflow = "hidden";
    }
  };
  useEffect(() => {
    if (show) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);
  useEffect(() => {
    if (missingFields.length > 0) {
      // Check if all previously missing fields are now filled
      const stillMissing = missingFields.filter(
        (field) => !formData[field]?.trim()
      );
      // If none are missing, remove the alert
      if (stillMissing.length === 0) {
        setShowErrorAlert(false);
        setMissingFields([]);
      }
    }
  }, [formData, missingFields]);
  return (
    <div id="hire-container" className="h-[100vh] w-full relative">
      <div className="bg-black text-white min-h-screen mt-2.5 mb-2 pt-2 px-6 flex flex-col md:flex-row gap-10 border-t border-gray-700">
        <AnimatePresence>
          {showErrorAlert && (
            <ErrorAlert
              missingFields={missingFields}
              onClose={() => setShowErrorAlert(false)}
            />
          )}
        </AnimatePresence>

        {/* LEFT SIDE: Image with Text Overlay */}
        <motion.div
          className="relative flex-1 h-full overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            // Original Unsplash image you used before
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Creative Work"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-center md:text-left"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Tell us what you <br /> need{" "}
              <span className="text-red-500">done.</span>
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg text-center max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              ✨ The more you share, the better we create!
            </motion.p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Form */}
        <motion.div
          className="flex-1 border-l border-gray-700 pl-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <motion.form
            className="space-y-6"
            name="hireUsForm"
            id="hireUsForm"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <AnimatedFormField label="Project Name">
              <input
                type="text"
                name="projectName"
                placeholder="e.g. New Website for My Startup"
                value={formData.projectName}
                onChange={handleChange}
              />
            </AnimatedFormField>

            <AnimatedFormField label="Project Type">
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="bg-white text-black"
              >
                <option className="text-black">Website Development</option>
                <option className="text-black">Mobile App</option>
                <option className="text-black">UI/UX Design</option>
                <option className="text-black">Marketing / SEO</option>
                <option className="text-black">Other</option>
              </select>
            </AnimatedFormField>

            <AnimatedFormField label="Project Description">
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your project in detail..."
                value={formData.description}
                onChange={handleChange}
              />
            </AnimatedFormField>

            <AnimatedFormField label="Attach Files (Max 25MB)">
              <div className="border-2 border-dashed border-blue-500 p-4 rounded-md cursor-pointer hover:bg-blue-900 transition">
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileUpload"
                  className="text-sm text-gray-400 cursor-pointer"
                >
                  Drag & drop any images or documents that might be helpful in
                  explaining your brief here. (Max 25 MB).
                </label>
              </div>
              {formData.files.length > 0 && (
                <p className="text-gray-400 text-sm mt-2">
                  {formData.files.length} file(s) selected
                </p>
              )}
            </AnimatedFormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedFormField label="Estimated Budget (USD)">
                <input
                  type="number"
                  name="budget"
                  placeholder="e.g. 1000"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </AnimatedFormField>
              <AnimatedFormField label="Deadline">
                <input
                  type="date"
                  name="deadline"
                  placeholder="2025-12-31"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </AnimatedFormField>
            </div>

            <AnimatedFormField label="Additional Notes">
              <textarea
                name="additionalNotes"
                rows="4"
                placeholder="Share extra details or requirements..."
                value={formData.additionalNotes}
                onChange={handleChange}
              />
            </AnimatedFormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedFormField label="Your Email">
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </AnimatedFormField>
              <AnimatedFormField label="Phone Number">
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +1 234 567 890"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </AnimatedFormField>
            </div>

            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-md font-semibold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
      {show && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40 backdrop-blur-xl">
          <Gratitude />
        </div>
      )}
    </div>
  );
};
const AnimatedFormField = ({ label, children }) => (
  <motion.div
    className="w-full"
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ scale: 1.02 }}
  >
    <label className="block text-gray-400 mb-1">{label}</label>
    <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className:
              "w-full h-full bg-transparent border-none focus:outline-none text-base placeholder-gray-400",
          });
        }
        return child;
      })}
    </div>
  </motion.div>
);
const ErrorAlert = ({ missingFields, onClose }) => {
  // For display, let's create a user-friendly map of field labels
  const fieldLabels = {
    projectName: "Project Name",
    projectType: "Project Type",
    description: "Project Description",
    budget: "Estimated Budget",
    deadline: "Deadline",
    additionalNotes: "Additional Notes",
    email: "Email",
    phone: "Phone Number",
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full bg-red-700 bg-opacity-90 text-white z-50 flex flex-col p-4"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Please Fill All Required Fields</h2>
        <button
          className="text-white font-semibold hover:text-black px-3 py-1 rounded bg-red-800 hover:bg-gray-200 transition"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <ul className="list-disc list-inside mt-2 text-sm">
        {missingFields.map((field) => (
          <li key={field} className="text-white">
            {fieldLabels[field] || field}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default HireUs;
