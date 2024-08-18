import { useState } from "react";

export default function FormWithoutyup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const validateForm = () => {
    let error = {};

    if (!formData.firstName) {
      error.firstName = "First name is required";
    }
    if (!formData.lastName) {
      error.lastName = "Last name is required";
    }
    if (!formData.email) {
      error.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      error.email = "invalid email format";
    }
    if (!formData.phone) {
      error.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      error.phone = "invalid phone number format";
    }
    if (!formData.password) {
      error.password = "password is required";
    } else if (!isValidPassword(formData.password)) {
      error.password = "invalid password format";
    }
    if (!formData.confirmPassword) {
      error.confirmPassword = "password is required";
    } else if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "passwords do not match";
    }
    if (!formData.age) {
      error.age = "age is required";
    } else if (formData.age && !isValidAge(formData.age)) {
      error.age = "invalid age";
    }
    if (!formData.gender) {
      error.gender = "gender is required";
    }
    if (formData.interests.length === 0) {
      error.interests = "interests are required";
    }
    if (!formData.birthDate) {
      error.birthDate = "birth date is required";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("form is submitted", formData);
    } else {
      console.log("form is invalid");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name,
      );
    }
    setFormData({ ...formData, interests: updatedInterests });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="cont">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div className="cont">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div className="cont">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="cont">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>
      <div className="cont">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div className="cont">
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div className="cont">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div className="cont">
        <label htmlFor="gender">Select Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}
      </div>
      <div className="cont">
        <label htmlFor="interests">Interests:</label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interests.includes("sports")}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="gaming"
            checked={formData.interests.includes("gaming")}
            onChange={handleCheckboxChange}
          />
          Gaming
        </label>
        {errors.interests && <p>{errors.interests}</p>}
      </div>
      <div className="cont">
        <label htmlFor="birthdate">Date of birth:</label>
        <input
          type="date"
          name="birthDate"
          placeholder="enter your date of birth"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && <p>{errors.birthDate}</p>}
      </div>
      <input type="submit" />
    </form>
  );
}
