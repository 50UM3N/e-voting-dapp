import { useState } from "react";
import useValidate from "../../Hooks/useValidate";
export const SampleForm = () => {
    const [formData, formValidator] = useValidate({
        email: { value: "", validate: "required|email", error: null },
        password: { value: "", validate: "required", error: null },
    });
    const handleChange = (e) => {
        formValidator.validOnChange(e.currentTarget);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValidator.validate());
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        value={formData.email.value}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        className={`form-control ${
                            formData.email.error ? "is-invalid" : ""
                        }`}
                        placeholder="Your email"
                    />
                    {formData.email.error && (
                        <div className="invalid-feedback">
                            {formData.email.error}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        value={formData.password.value}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        className={`form-control ${
                            formData.password.error ? "is-invalid" : ""
                        }`}
                        placeholder="Your password"
                    />
                    {formData.password.error && (
                        <div className="invalid-feedback">
                            {formData.password.error}
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};
