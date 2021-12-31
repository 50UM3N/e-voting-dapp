import React from "react";
import useValidate from "../../Hooks/useValidate";

export const Register = () => {
    const [formData, formValidator] = useValidate({
        firstname: { value: "", validate: "required|string", error: null },
        lastname: { value: "", validate: "required|string", error: null },
        email: { value: "", validate: "required|email", error: null },
        dateOfBirth: { value: "", validate: "required|age18", error: null },
        mobileNo: {
            value: "",
            validate: "required|number|mobile",
            error: null,
        },
        aadhaarNumber: {
            value: "",
            validate: "required|number|UIDAI",
            error: null,
        },
        password: { value: "", validate: "required", error: null },
    });

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        formValidator.validOnChange(e.currentTarget);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValidator.validate());
    };

    return (
        <>
            <div className="register-wrapper">
                <div className="row g-0">
                    <div className="col-md-4 left-wrapper">
                        <ul className="link-container">
                            <li>About</li>
                            <li>Privacy</li>
                            <li>Terms & Use</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="col-md-8 p-3 right-wrapper">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <h1 className="mb-4">New Voter Registration</h1>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.firstname.value}
                                    name="firstname"
                                    placeholder="Enter first name"
                                    className={`form-control ${
                                        formData.firstname.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {formData.firstname.error && (
                                    <div className="invalid-feedback">
                                        {formData.firstname.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    onChange={handleChange}
                                    value={formData.lastname.value}
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastname"
                                    className={`form-control ${
                                        formData.lastname.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {formData.lastname.error && (
                                    <div className="invalid-feedback">
                                        {formData.lastname.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Email address
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={formData.email.value}
                                    placeholder="Enter email address"
                                    type="email"
                                    className={`form-control ${
                                        formData.email.error ? "is-invalid" : ""
                                    }`}
                                    name="email"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                {formData.email.error && (
                                    <div className="invalid-feedback">
                                        {formData.email.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Date of Birth
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={formData.dateOfBirth.value}
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className={`form-control ${
                                        formData.dateOfBirth.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {formData.dateOfBirth.error && (
                                    <div className="invalid-feedback">
                                        {formData.dateOfBirth.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile No.</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        +91
                                    </span>
                                    <input
                                        onChange={handleChange}
                                        value={formData.mobileNo.value}
                                        name="mobileNo"
                                        placeholder="Enter mobile number"
                                        type="text"
                                        className={`form-control ${
                                            formData.mobileNo.error
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    {formData.mobileNo.error && (
                                        <div className="invalid-feedback">
                                            {formData.mobileNo.error}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">UIDAI No.</label>
                                <input
                                    onChange={handleChange}
                                    value={formData.aadhaarNumber.value}
                                    type="text"
                                    placeholder="Enter aadhaar number"
                                    className={`form-control ${
                                        formData.aadhaarNumber.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    name="aadhaarNumber"
                                />
                                {formData.aadhaarNumber.error && (
                                    <div className="invalid-feedback">
                                        {formData.aadhaarNumber.error}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
