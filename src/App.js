import './App.css';

import {
	FaAngleRight,
	FaBell,
	FaCentercode,
	FaEnvelopeOpenText,
	FaHistory,
	FaIndent,
	FaJoget,
	FaOutdent,
	FaPlus,
	FaSignal,
	FaStopwatch,
	FaThLarge,
	FaTools,
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

import CalenderDay from './components/CalenderDay';
import SideBarLinks from './components/SideBarLinks';
import WorkItem from './components/WorkItem';

const NAV_LINKS = [
	{
		name: 'Dashboard',
		icon: FaThLarge,
	},
	{
		name: 'Analytics',
		icon: FaSignal,
	},
	{
		name: 'Projects',
		icon: FaBell,
	},
	{
		name: 'Tracking',
		icon: FaStopwatch,
	},
	{
		name: 'History',
		icon: FaHistory,
	},
	{
		name: 'Setting',
		icon: FaTools,
	},
];

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
	const calenderWrapperRef = useRef();
	const [datesList, setDateList] = useState([]);
	const [activeNav, setActiveNav] = useState('Projects');
	const [toggleSideBar, setToggleSidebar] = useState(true);

	const [workingDateList, setWorkingDateList] = useState([]);
	const [calenderWrapperWidth, setCalenderWrapperWidth] = useState(0);

	let completionRate =
		workingDateList.reduce(
			(sum, curr) => sum + Number(curr.completionRate),
			0
		) / workingDateList.length;

	const getDateRange = () => {
		let dates = [];
		let currentDate = new Date();

		for (let i = 10; i >= 1; i--) {
			const currentDay = currentDate.getDate();
			let indexDate = new Date();
			indexDate.setDate(currentDay - i);
			dates.push(indexDate);
		}

		dates.push(currentDate);

		for (let i = 1; i < 8; i++) {
			const currentDay = currentDate.getDate();
			let indexDate = new Date();
			indexDate.setDate(currentDay + i);
			dates.push(indexDate);
		}

		setDateList(dates);
	};

	const getRandomDatesRange = () => {
		let startDay = getRndInteger(1, 15);
		let dayDifference = getRndInteger(6, 15);
		let startDate = new Date();
		let endDate = new Date();

		endDate.setDate(startDay + dayDifference);
		startDate.setDate(startDay);

		return {
			startDate,
			endDate,
		};
	};

	const computeWorkItems = () => {
		let list = [];
		for (let i = 0; i < 10; i++) {
			const hold = getRandomDatesRange();
			hold.completionRate = getRndInteger(10, 100);
			hold.name = 'Habib Popoola';

			list.push(hold);
		}

		setWorkingDateList(list);
	};

	let computePosition = (dateRange) => {
		let currentDate = new Date();
		let currentDay = currentDate.getDate();
		let { startDate, endDate } = dateRange;
		let unitWidth = calenderWrapperWidth / datesList.length;
		let startIndex = currentDay - 9;
		let startPosition;
		let width;
		if (startDate.getDate() <= startIndex) {
			startPosition = 0;
			width =
				(endDate.getDate() - startIndex) * unitWidth +
				unitWidth +
				unitWidth / 2;
		} else {
			let diff = startDate.getDate() - startIndex;

			startPosition = diff * unitWidth + unitWidth;
			width =
				(endDate.getDate() - startDate.getDate()) * unitWidth + unitWidth / 2;
		}
		return { startPosition, width };
	};

	let increaseCompletionRate = () => {
		setWorkingDateList((prev) => {
			let newState = prev.map((i) => {
				let newObj = {
					...i,
				};
				let increaseFactor = getRndInteger(10, 30);
				console.log(newObj, increaseFactor);
				newObj.completionRate = newObj.completionRate + increaseFactor;
				if (newObj.completionRate > 100) {
					newObj.completionRate = 100;
				}
				return newObj;
			});
			return newState;
		});
	};

	const handleSideBarToggle = () => {
		setToggleSidebar((prev) => !prev);
	};

	const handleCalenderWrapperWidth = () => {
		setCalenderWrapperWidth(
			Number(getComputedStyle(calenderWrapperRef?.current)?.width.slice(0, -2))
		);
	};

	useEffect(() => {
		getDateRange();
		computeWorkItems();
		handleCalenderWrapperWidth();
	}, []);

	useEffect(() => {
		handleCalenderWrapperWidth();
	}, [toggleSideBar]);

	useEffect(() => {
		if (completionRate >= 100) return;
		const id = setInterval(increaseCompletionRate, 10000);
		return () => clearInterval(id);
	}, [workingDateList]);

	return (
		<div className='container'>
			<nav
				className='side-bar transition-width'
				//	style={{ width: toggleSideBar ? 250 : 60 }}
			>
				<div className='nav-header'>
					{toggleSideBar ? (
						<>
							<FaCentercode size={30} color='rgba(29, 92, 252,1)' />
							<span>PJ</span>
							<FaOutdent
								onClick={handleSideBarToggle}
								className='nav-toggler'
								size={24}
								style={{ marginLeft: 'auto' }}
							/>
						</>
					) : (
						<FaIndent
							onClick={handleSideBarToggle}
							className='nav-toggler'
							size={24}
							style={{ marginLeft: 'auto' }}
						/>
					)}
				</div>
				<ul className='nav-list'>
					{NAV_LINKS.map((i, index) => {
						return (
							<SideBarLinks
								name={i.name}
								icon={i.icon}
								activeNav={activeNav}
								setActiveNav={setActiveNav}
								toggleSideBar={toggleSideBar}
							/>
						);
					})}
				</ul>
			</nav>
			<div className='main'>
				<div className='main-nav'>
					<div className='main-nav-left'>
						<span>{activeNav}</span>
						<FaAngleRight />
						<span>GSE Banking</span>
					</div>
					<div className='main-nav-right'>
						<FaEnvelopeOpenText />
						<FaBell />
						<span
							style={{
								width: 1,
								alignSelf: 'stretch',
								backgroundColor: 'rgba(19, 30, 58, 0.1)',
								//	margin: '0 100',
							}}
						></span>
						<FaJoget size={40} color='rgba(19, 30, 58)' />
						<span style={{ color: 'rgba(19, 30, 58)' }}>RonansIT</span>
					</div>
				</div>
				<div className='main-header'>
					<div className='main-header-title'>
						<h1>GSE Banking app</h1>
						<div
							style={{ display: 'flex', alignItems: 'center' }}
							className='progress-container'
						>
							<span style={{ fontWight: '700', marginRight: 15 }}>
								{completionRate}%
							</span>

							<div
								className=''
								style={{
									width: 70,
									height: 3,
									backgroundColor: 'rgba(29, 92, 252,0.3)',
									position: 'relative',
								}}
							>
								<div
									className='	transition-width'
									style={{
										backgroundColor: 'rgba(29, 92, 252,1)',
										position: 'absolute',
										left: 0,
										right: 0,
										height: 3,
										width: completionRate + '%',
									}}
								/>
							</div>
						</div>
					</div>
					<div className='main-header-right'>
						<div className='invite'>
							<FaPlus />
							<span>invite</span>
						</div>
					</div>
				</div>

				<div className='calender-wrapper' ref={calenderWrapperRef}>
					{datesList.map((i) => {
						return <CalenderDay date={i} />;
					})}
					<div className='work-items-container'>
						{workingDateList.map((i, index) => {
							let pt = computePosition(i);
							return <WorkItem data={i} index={index} computedData={pt} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
