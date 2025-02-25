const Student = require("../models/Student")

exports.studentRegistration = async (req, res) => {
	try {
		const { name, email, age, course } = req.body;

		console.log(req.body)

		if (!name || !email || !age || !course) {
			return res.status(400).json({
				success: false,
				message: "fields cant be empty, please fill all the feilds before submitting"
			})
		}

		const existingStudent = await Student.findOne({ email })

		if (existingStudent) {
			return res.status(400).json({
				success: false,
				message: "Student with this email already exist, please use different email"
			})
		}

		const newStudent = await Student.create({ name, email, age, course });

		res.status(200).json({
			success: true,
			data: newStudent,
			message: "student register successfully"
		})


	} catch (error) {
		res.status(500).json({
			success: false,
			message: "something went wrong",
			error: error.message
		})
	}
}


exports.studentList = async (req, res) => {
	try {
		const students = await Student.find({});
		console.log(students.length)
		if (students.length == 0) {
			return res.status(200).json({
				success: true,
				message: "No student found in database",
			})
		}

		res.status(200).json({
			success: true,
			data: students,
			message: "all students fetched successfully"
		})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "something went wrong",
			error: error.message
		})
	}
}


exports.removeStudent = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Invalid request, id is missing",
			});
		}

		const student = await Student.findByIdAndDelete({ _id: id }, { new: true })

		if (!student) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: student,
			message: "student removed successfully"
		})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "something went wrong",
			error: error.message
		})
	}
}


exports.searchStudent = async (req, res) => {
	try {
		const { name } = req.query;
		// console.log(name)
		if (!name) {
			return res.status(400).json({
				success: false,
				error: error.message,
				message: "name is required"
			});
		}

		const students = await Student.find({ name: { $regex: name, $options: "i" } });
		res.status(200).json({
			success: true,
			data: students,
			message: "student found"
		});
	} catch (error) {
		res.status(500).json(
			{
				error: "Server Error"
			}
		);
	}

}

exports.studentDetails = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id);
		if (!student) {
			return res.status(404).json({
				success: false,
				error: error.message,
				message: "Student not found"
			});
		}

		res.json(student);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
			message: "something went wrong"
		});
	}

}