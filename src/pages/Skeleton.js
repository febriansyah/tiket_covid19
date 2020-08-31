import React from 'react';

class Skeleton extends React.Component {
	

	render() {
		
		return (
			<div>
				<div id="skeleton_desktop" className="skeletonLoading">
					<div className="wrapper relative">
						<div className="card__title loading"></div>
						<div className="card__description loading"></div>  
						<div className="card__image loading"></div>
						<div className="card__title2 loading"></div>
						<div className="card__title2 loading"></div>
						<div className="card__title2 loading"></div> 
						<div>
							<div className="card__title loading"></div>
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

				<div id="skeleton_mobile" className="skeletonLoading">
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