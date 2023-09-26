import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	FaUsers,
	FaChartBar,
	FaCog,
	FaUserCircle
} from 'react-icons/fa';
import LoadingIndicator from "../../UI/LoadingIndicator";

const Home = ({ userData = {} }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [greeting, setGreeting] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (userData && Object.keys(userData).length > 0) {
			setIsLoading(false);
		} else {
			setError("There was a problem fetching the user data.");
			setIsLoading(false);
		}

		const now = new Date();
		const currentHour = now.getHours();

		if (currentHour >= 5 && currentHour < 12) {
			setGreeting("Good Morning,");
		} else if (currentHour >= 12 && currentHour < 18) {
			setGreeting("Good Afternoon,");
		} else {
			setGreeting("Good Evening,");
		}
	}, [userData]);

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
	}

	return (
		<div className="flex-1 p-8 bg-background relative">
			<AdminHeader greeting={greeting} userData={userData} />
			<AdminProfile userData={userData} />
			<AdminActivitySection />
		</div>
	);
};

const AdminHeader = ({ greeting, userData }) => (
	<div className="flex items-center justify-between mb-10">
		<div>
			<h2 className="text-xl sm:text-2xl text-dark mb-2">{greeting}</h2>
			<h1 className="text-3xl sm:text-5xl font-bold text-dark mb-4">{userData.firstName}</h1>
		</div>
		<button className="bg-dark text-white py-1 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md hover:bg-dark active:bg-dark transition-colors duration-300"
				onClick={() => navigate('/AdminDashboard/ManageUsers')}>
			Manage Users
		</button>
	</div>
);

const AdminProfile = ({ userData }) => {
	return (
		<div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md p-6 mb-8">
			<img
				src={userData.profilePic || 'https://via.placeholder.com/100'}
				alt="Profile"
				className="rounded-full w-24 h-24 border-4 border-dark mb-4 sm:mb-0 sm:mr-8"
			/>
			<div>
				<h2 className="text-2xl font-semibold text-dark">{userData.firstName} {userData.lastName}</h2>
				<p className="text-lg mt-4">
					Role: Admin
				</p>
			</div>
		</div>
	)
};

const AdminActivitySection = () => (
	<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
		<ActivityCard icon={<FaUsers />} title="Users" description="Manage all users including clients and trainers." />
		<ActivityCard icon={<FaChartBar />} title="Analytics" description="View platform usage analytics and reports." />
		<ActivityCard icon={<FaCog />} title="Settings" description="Manage system configurations and settings." />
		<ActivityCard icon={<FaUserCircle />} title="Profile" description="Update your admin details and settings." />
	</div>
);

const ActivityCard = ({ icon, title, description }) => (
	<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
		<div className="flex items-center mb-4">
			<div className="text-dark text-4xl mr-4">
				{icon}
			</div>
			<h3 className="text-2xl font-semibold text-dark">{title}</h3>
		</div>
		<p className="text-text">{description}</p>
	</div>
);

export default Home;