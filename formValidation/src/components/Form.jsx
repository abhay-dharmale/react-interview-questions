import { useState } from "react";
import * as yup from "yup";

export default function Form() {
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

  const validationSchema = yup.object({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('first name is required'),
    email: yup.string().email('invalid email format').required('email is required'),
    phone:yup.string().matches(/^\d{10}$/, 'invalid phone number').required(),
    password: yup.string().required('password is required').min(8, 'must be at least 8 characters').matches(/[0-9]/, 'must contain at least one number'),
    confirmPassword:yup.string().oneOf([yup.ref('password')], 'passwords must match').required( 'confirm password is required'),
    age: yup.number().required('age is required').min(18, 'must be at least 18 years'),
    gender: yup.string().required( 'gender is required'),
    interests: yup.array().min(1).required('at least one interest is required'),
    birthDate: yup.date().required('birth date is required'),
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await validationSchema.validate(formData, { abortEarly: false })
      console.log('form submitted', formData)
    }catch(err){
      const newErr = {}
      err.inner.forEach(err =>{
        newErr[err.path] = err.message
      })
      setErrors(newErr)
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
      <div className='cont'>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div className='cont'>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div className='cont'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

      </div>
      <div className='cont'>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}

      </div>
      <div className='cont'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

      </div>
      <div className='cont'>
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      </div>
      <div className='cont'>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}

      </div>
      <div className='cont'>
        <label htmlFor="gender">Select Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}

      </div>
      <div className='cont'>
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
      <div className='cont'>
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
