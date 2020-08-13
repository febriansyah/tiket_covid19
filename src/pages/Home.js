import React,{Suspense, lazy } from 'react';
import Maps from './Maps';

//const HomeLazy = React.lazy(() => import('./HomeLazy'));
const HomeLazy = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./HomeLazy")), 2500);
  });
});

class Home extends React.Component {
	

	render() {

		return (
			<div>
				<Suspense fallback={<div className="splashScreen" ><img src="assets/images/logo-tiket.png" alt='splashScreen logo' /></div>}>
			          <HomeLazy />
			    </Suspense>
			</div>
		)
	}
}
export default Home;