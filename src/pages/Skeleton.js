import React from 'react';

class Skeleton extends React.Component {
	

	render() {
		
		return (
			<div>
				<div className="skeletonLoading">
					<div className="wrapper relative">
						<div className="card__title loading"></div>
						<div className="card__description loading"></div>  
						<div className="card__title loading"></div>
						<div className="card__image loading"></div>
						<div className="card__title2 loading"></div>
						<div className="card__title2 loading"></div>
						<div className="card__title2 loading"></div> 
						<div className="card__title loading"></div>
						<div className="block_policy">
							<div className="card__imgblock loading">
							</div>
							<div className="caption_policy">
								<div className="card__title2 loading"></div> 
								<div className="card__titleFull loading"></div>
							</div>
						</div>
						<div className="block_policy">
							<div className="card__imgblock loading">
							</div>
							<div className="caption_policy">
								<div className="card__title2 loading"></div> 
								<div className="card__titleFull loading"></div>
							</div>
						</div>
						<div className="block_policy">
							<div className="card__imgblock loading">
							</div>
							<div className="caption_policy">
								<div className="card__title2 loading"></div> 
								<div className="card__titleFull loading"></div>
							</div>
						</div>
					</div>{/* end.wrapper */}
				</div>{/* end.skeletonLoading */}
			</div>
		)
	}
}
export default Skeleton;