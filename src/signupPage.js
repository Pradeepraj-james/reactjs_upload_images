import React, { useState } from "react";
import axios from "axios";

const Input = ({ type, label, onChange, value, placeholder }) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

//Sign UP Page

const SignUpPage = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState("");

    //Form OnSubmit Method

    const OnSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !file) {
            setTimeout(() => setError(""), 10000);
            return setError("Please Enter Required Data");
        }
        signup({ name, email, password, file });
    };

    //Sending request to server

    const signup = async ({ name, email, password, file }) => {
        try {
            let data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("password", password);
            data.append("file", file);

            const response = await axios.post(
                "http://localhost:5000/user/new", data);

            if (response.status === 201) {
                const { id } = response.headers;
                return history.push(`profile/${id}`);
            }
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div className="ui fomantic">
            <form className="ui form error" onSubmit={OnSubmit}>
                <h4 className="ui dividing header">Create a Profile</h4>
                <Input
                    type="text"
                    label="Name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Input
                    type="file"
                    label="Image"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                {!error ? null : <div className="ui error message">{Error}</div>}
                <button className="ui blue button" type="submit">
                    Sign UP
                </button>
            </form>
        </div>
    );

};

export default SignUpPage;