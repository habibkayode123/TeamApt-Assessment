import { COLORS, COLORS_LIGHT } from '../shared/constant';

import { FaDotCircle } from 'react-icons/fa';

const WorkItem = ({ data, computedData, index }) => {
	return (
		<div className='work-item-wrapper'>
			<div className='work-item-name'>
				<p style={{ fontWeight: 600 }}>{data.name}</p>
				<p style={{}}>Frontend Engineer</p>
			</div>
			<div
				className='work-item'
				style={{
					//	marginLeft: positions,
					left: computedData.startPosition,
					width: computedData.width,

					backgroundColor: COLORS_LIGHT[index % COLORS.length],
				}}
			>
				<p
					style={{
						color: COLORS[index % COLORS.length],
					}}
					className='work-item-value'
				>
					{data.completionRate + '%'}
				</p>

				<div
					className='work-item-inner transition-width'
					style={{
						width: data.completionRate + '%',

						backgroundColor: COLORS[index % COLORS.length],
						//	borderTopLeftRadius: 'unset',
						//borderBottomLeftRadius: 0,
					}}
				>
					<FaDotCircle className='dot-circle' />
					{/* <span>Work Item {index + 1}</span> */}
					<span>
						{data.startDate.getDate()}----{data.endDate.getDate()}
					</span>
				</div>
			</div>
		</div>
	);
};

export default WorkItem;
