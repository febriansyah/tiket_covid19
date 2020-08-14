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
				<Suspense fallback={<div style={{backgroundColor:'#fff',position:'fixed',zIndex: 99,width:'100%',height:'100%',textAlign:'center'}} ><img style={{maxWidth: '100px',display: 'inline-block',paddingTop:'40vh'}} src="assets/images/logo-tiket.png" alt='splashScreen logo' /></div>}>
			          <HomeLazy />
			    </Suspense>
			</div>
		)
	}
}
export default Home;