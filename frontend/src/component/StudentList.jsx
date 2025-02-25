import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setStudents, removeStudent } from "../redux/slices/StudentSlice.js";

const StudentList = () => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.students);

	const fetchStudents = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/student");
			const data = await response.json();
			dispatch(setStudents(data.data));
		} catch (error) {
			console.log(error.message)
		}
	};

	const handleRemove = async (id) => {
		try {
			console.log(id)
			const response = await fetch("http://localhost:4000/api/v1/student/remove",
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ id })
				}
			);
			const data = await response.json();

			console.log("deleted: ", data)

			if (data.success) {
				toast.success(data.message)
				dispatch(removeStudent(data.data._id));
			} else {
				toast.error(data.message)
			}

		} catch (error) {
			console.log(error.messgae)
		}
	}


	useEffect(() => {
		fetchStudents();
	}, []);

	useEffect(() => {

	}, [students]);

	return (
		<div className="d-flex justify-content-center flex-column">
			<h2 className="text-center mt-3">Student List</h2>
			{
				students?.length > 0 ?

					<table className="table table-bordered text-center">
						<thead>
							<tr>
								<th>Name</th>
								<th>Age</th>
								<th>Email</th>
								<th>Course</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{students?.length > 0 && students.map((student) => (
								<tr key={student._id}>
									<td>{student.name}</td>
									<td>{student.age}</td>
									<td>{student.email}</td>
									<td>{student.course}</td>
									<td>
										<button className="btn btn-outline-danger" onClick={() => handleRemove(student._id)}>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table> :
					<h4 className="text-center mt-4">No record found</h4>
			}
		</div>
	);
};

export default StudentList;