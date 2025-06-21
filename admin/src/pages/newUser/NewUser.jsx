import "./newUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../../redux/apiCalls";

export default function NewUser() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    isActive: true,
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData, dispatch); // ✅ order fixed
      alert("User created successfully!");
      history.push("/users");
    } catch (err) {
      alert("Failed to create user.");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" placeholder="john" onChange={handleChange} required />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="John Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder="john@gmail.com" onChange={handleChange} required />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" placeholder="password" onChange={handleChange} required />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+91 1234567890" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" name="address" placeholder="India" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleChange} />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange} />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="isActive" onChange={handleChange} defaultValue="true">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Admin Access</label>
          <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
        </div>
        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}
