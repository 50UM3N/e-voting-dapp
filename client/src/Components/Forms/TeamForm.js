import { connect } from "react-redux";
import useValidate from "../../Hooks/useValidate";
import { ToastContainer, toast } from "react-toastify";

const TeamForm = ({ voterContract, web3, onSuccess = null }) => {
    const [formData, validator] = useValidate({
        team_name: { value: "", validate: "required", error: null },
        representative: { value: "", validate: "required", error: null },
        description: { value: "", validate: "required", error: null },
    });

    const handleChange = (e) => {
        validator.validOnChange(e.currentTarget);
    };
    const handleOnSubmit = async (e) => {
        let toastOption = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        e.preventDefault();
        if (!validator.validate()) return;

        let address = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data = await toast.promise(
            voterContract.contract.methods
                .addTeam(
                    formData.representative.value,
                    formData.description.value,
                    formData.team_name.value
                )
                .send({ from: address[0] }),
            {
                pending: "Waiting for conformation",
                success: "Team is added 👌",
                error: "Error in adding team 🤯",
            },
            toastOption
        );
        onSuccess && onSuccess(data.events.AddTeam.returnValues._team);
    };
    return (
        <form onSubmit={handleOnSubmit}>
            <h5>Add new teams</h5>
            <hr />
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label">Team Name</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={formData.team_name.value}
                        name="team_name"
                        placeholder="Enter team name"
                        className={`form-control ${
                            formData.team_name.error ? "is-invalid" : ""
                        }`}
                    />
                    {formData.team_name.error && (
                        <div className="invalid-feedback">
                            {formData.team_name.error}
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Representative</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={formData.representative.value}
                        name="representative"
                        placeholder="Enter representative name"
                        className={`form-control ${
                            formData.representative.error ? "is-invalid" : ""
                        }`}
                    />
                    {formData.representative.error && (
                        <div className="invalid-feedback">
                            {formData.representative.error}
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    defaultValue={formData.description.value}
                    onChange={handleChange}
                    name="description"
                    placeholder="Enter team description"
                    className={`form-control ${
                        formData.description.error ? "is-invalid" : ""
                    }`}
                    rows="3"
                ></textarea>
                {formData.description.error && (
                    <div className="invalid-feedback">
                        {formData.description.error}
                    </div>
                )}
            </div>
            <button className="btn btn-sm btn-primary" type="submit">
                Add
            </button>
            <ToastContainer />
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        voterContract: state.contractReducer,
        web3: state.web3Reducer,
    };
};

export default connect(mapStateToProps)(TeamForm);
