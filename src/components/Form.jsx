import React, { useState, useEffect } from 'react'
import './Form.css';


function Form() {

  // LocalStorage se data load karo
  const [user, setUser] = useState({});
  const [hobby, setHobby] = useState([]);
  const [list, setList] = useState(() => {
    const savedData = localStorage.getItem('userList');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [error, setError] = useState({});
  const [editId, setEditId] = useState(null);

  const cities = ["Navsari", "Surat", "Bilimora", "Chikhli", "Vapi"];

  // Jab bhi list change ho, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(list));
  }, [list]);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "hobby") {
      let newHobby = [...hobby];

      if (newHobby.includes(value)) {
        newHobby = newHobby.filter(val => val !== value);
      } else {
        newHobby.push(value);
      }

      setHobby(newHobby);
      value = newHobby;
    }

    setUser({ ...user, [name]: value });
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let err = {};

    if (!user.username) err.username = "Username is required.";
    if (!user.email) err.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(user.email)) err.email = "Invalid email format.";

    if (!user.password) err.password = "Password is required.";
    else if (user.password.length < 6) err.password = "Minimum 6 characters required.";

    if (!user.gender) err.gender = "Please select gender.";

    if (hobby.length === 0) err.hobby = "Please select at least 1 hobby.";

    if (!user.city) err.city = "Please select your city.";

    if (!user.address) err.address = "Address is required.";

    setError(err);

    // true = error exists
    return Object.keys(err).length !== 0;
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      return; // Stop form submit if any error
    }

    if (editId) {
      let newList = list.map((value) => {
        if (value.id === editId) {
          return { ...value, ...user, hobby };
        }
        return value;
      });

      setList(newList);
      setEditId(null);
    } else {
      setList([...list, { ...user, hobby, id: Date.now() }]);
    }

    setUser({});
    setHobby([]);
    setError({});
  };

  // ---------------- HANDLE DELETE ----------------
  const handleDelete = (id) => {
    let newList = list.filter((value) => value.id !== id);
    setList(newList);
  };

  // ---------------- HANDLE EDIT ----------------
  const handleEdit = (id) => {
    let data = list.find(value => value.id === id);
    setUser(data);
    setHobby(data.hobby);
    setEditId(id);
  };

  // ---------------- RETURN UI ----------------
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            {/* Username */}
            <div className="mb-3 mt-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                className='form-control'
                name='username'
                onChange={handleChange}
                value={user.username || ''}
                placeholder='Enter Your Name'
              />
              {error.username && <small className="text-danger">{error.username}</small>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className='form-control'
                name='email'
                onChange={handleChange}
                value={user.email || ''}
                placeholder='Enter Your Email'
              />
              {error.email && <small className="text-danger">{error.email}</small>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className='form-control'
                name='password'
                onChange={handleChange}
                value={user.password || ''}
                placeholder='Enter Your Password'
              />
              {error.password && <small className="text-danger">{error.password}</small>}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label me-3">Gender</label>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>

              {error.gender && <small className="text-danger d-block">{error.gender}</small>}
            </div>

            {/* Hobby */}
            <div className="mb-3">
              <label className="form-label">Hobby</label>

              <div className="row">
                <div className="col-3">
                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="gaming"
                      className="form-check-input"
                      checked={hobby.includes("gaming")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Gaming</label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="coding"
                      className="form-check-input"
                      checked={hobby.includes("coding")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Coding</label>
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="dancing"
                      className="form-check-input"
                      checked={hobby.includes("dancing")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Dancing</label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="camping"
                      className="form-check-input"
                      checked={hobby.includes("camping")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Camping</label>
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="traveling"
                      className="form-check-input"
                      checked={hobby.includes("traveling")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Traveling</label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" name="hobby" value="reading"
                      className="form-check-input"
                      checked={hobby.includes("reading")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Reading</label>
                  </div>
                </div>
              </div>

              {error.hobby && <small className="text-danger">{error.hobby}</small>}
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <select
                name="city"
                className="form-select"
                value={user.city || ""}
                onChange={handleChange}
              >
                <option value="" disabled>--select-city--</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {error.city && <small className="text-danger">{error.city}</small>}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                rows={3}
                className="form-control"
                onChange={handleChange}
                value={user.address || ""}
              ></textarea>
              {error.address && <small className="text-danger">{error.address}</small>}
            </div>

            {/* Buttons */}
            <button type='submit'
              className={`btn ${editId ? "btn-warning" : "btn-outline-primary"}`}>
              {editId ? "Update" : "Submit"}
            </button>

            {" "}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setUser({});
                setHobby([]);
                setEditId(null);
                setError({});
              }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-dark table-bordered table-striped table-hover caption-top">
              <caption><h2>User Details</h2></caption>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Hobby</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {list.length > 0 ? (
                  list.map((value, index) => {
                    const { username, email, password, gender, hobby, city, address, id } = value;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{password}</td>
                        <td>{gender}</td>
                        <td>{hobby.join(", ")}</td>
                        <td>{city}</td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {address.replace(/,/g, ",\n")}
                        </td>

                        <td>
                          <button onClick={() => handleDelete(id)} className="btn btn-outline-danger">Delete</button>
                          {" "}
                          <button onClick={() => handleEdit(id)} className="btn btn-outline-warning">Edit</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">Data Not Found.</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Form;