import React,{Suspense, lazy } from 'react';
import Skeleton from './Skeleton';

//const HomeLazy = React.lazy(() => import('./HomeLazy'));
const HomeLazy = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./HomeLazy")),2500);
  });
});

class Home extends React.Component {
	

	render() {

		return (
			<div>
				<Suspense fallback={<Skeleton />}>
			          <HomeLazy />
			    </Suspense>
			</div>
		)
	}
}
export default Home;