import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
	const { id } = useParams();
	const [student, setStudent] = useState(null);

	useEffect(() => {
		const fetchStudent = async () => {
			const response = await fetch(`http://localhost:4000/api/v1/student/${id}`);
			const data = await response.json();
			setStudent(data);
		};
		fetchStudent();
	}, [id]);

	if (!student) return <p>Loading...</p>;

	return (
		<div>
			<h2>Student Details</h2>
			<p><strong>Name:</strong> {student.name}</p>
			<p><strong>Email:</strong> {student.email}</p>
			<p><strong>Age:</strong> {student.age}</p>
			<p><strong>Course:</strong> {student.course}</p>
		</div>
	);
};

export default StudentDetails;