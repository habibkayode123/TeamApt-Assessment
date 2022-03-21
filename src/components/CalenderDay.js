import { WEEK_DAYS } from '../shared/constant';

const CalenderDay = ({ date }) => {
	let currentDate = date.getDate();
	let today = new Date().getDate();
	return (
		<div className='calender-day'>
			<div
				className={`calender-day-text ${
					today === currentDate ? 'is-today' : ''
				}`}
			>
				<span className='calender-day-text-light'>
					{WEEK_DAYS[date.getDay()]}
				</span>
				<span className='calender-day-text-bold'>{currentDate}</span>
			</div>
			<div className='calender-day-border'>
				{today === currentDate && (
					<div
						className=''
						style={{
							position: 'absolute',
							height: '100%',
							width: 1,
							backgroundColor: 'rgba(29, 92, 252,1)',
							left: 0,
							right: 0,
							margin: 'auto',
						}}
					></div>
				)}
			</div>
		</div>
	);
};

export default CalenderDay;
