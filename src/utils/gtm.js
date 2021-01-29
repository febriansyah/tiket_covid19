// initial params
let tagManagerArgs = {
	gtmId: 'GTM-PLRJPPQ',
	screenName: 'tiketSafe',
	vertical: 'flight',
	platform: '',
	flight: {
		'destinationCity': '',
		'Keyword': '', 
		'destinationStatus' : '',
		'airline': '',
		'destinationAirport' : '', 
		'type': ''
	}
	
	
	
};

export const initialGTM = () => {
    sendEventGTM(tagManagerArgs);
};


export const sendEventGTM = (objDataLayer, gtmProperty, gtmFlight) => {
    const dataLayer = window.dataLayer;
	dataLayer.push(objDataLayer);

	const objProperty = gtmProperty || {};
	const objFlight = gtmFlight || {};

	// set data
	tagManagerArgs = {
		...tagManagerArgs,
		...objProperty,
	
		flight: {
			...tagManagerArgs.flight,
			...objFlight
		}
	};
	
	//show on gtm
	window.gtm = window.gtm || {};
	window.gtm = {
        ...window.gtm,
        ...tagManagerArgs,
    };
    
    //console.log("gtmnya => ", window.gtm);
};