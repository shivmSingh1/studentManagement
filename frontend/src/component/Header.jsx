import React from 'react'
import SearchStudent from './SearchStudent'
import { Link } from 'react-router-dom'
import './styles/header.css'

function Header() {
	return (
		<>
			<div className='sh-header mt-3 d-flex justify-content-between'>
				<div>
					<SearchStudent />
				</div>
				<div>
					<Link to='/student'><button className='btn btn-success mx-4'>StudentList</button></Link>
					<Link to='/'><button className='btn btn-success'>Registration</button></Link>
				</div>
			</div>
		</>
	)
}

export default Header