import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';

function StudentRegistration() {

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
		course: ""
	});

	const handleForm = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData((prev) => (
			{
				...prev, [name]: value
			}
		))
	}


	const registerStudent = async (formData) => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/registration",
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}
			);
			const data = await response.json();
			if (data.success === true) {
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}

		} catch (error) {
			console.log("something went wrong", error.message)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		registerStudent(formData)
		setFormData({
			name: "",
			email: "",
			age: "",
			course: ""
		})
	}

	return (
		<>
			<div className="container mt-5">
				<h2 className='text-center mb-5'>Student Registration</h2>
				<form onSubmit={handleSubmit} className="w-50 mx-auto">
					<div className="mb-3">
						<label className="form-label">Name</label>
						<input
							type="text"
							name="name"
							className="form-control"
							value={formData.name}
							onChange={(e) => handleForm(e)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
							value={formData.email}
							onChange={(e) => handleForm(e)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Age</label>
						<input
							type="number"
							name="age"
							className="form-control"
							value={formData.age}
							onChange={(e) => handleForm(e)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Course</label>
						<input
							type="text"
							name="course"
							className="form-control"
							value={formData.course}
							onChange={(e) => handleForm(e)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">Register</button>
				</form>
			</div>
		</>
	)
}

export default StudentRegistration