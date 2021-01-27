// initial params
const tagManagerArgs = {
	gtmId: 'GTM-PLRJPPQ',
	screenName: 'tiketSafe',
	vertical: 'flight',
	platform: '',
	dataLayer: {
		'event': 'click',
		'eventCategory': 'viewAirlinePolicy',
		'eventLabel': 'flight'
	},
	flight: {
		'destinationCity': 'click',
		'Keyword': ' viewAirportPolicy', 
		'destinationStatus' : 'flight',
		'airline': 'click',
		'destinationAirport' : ' viewAirportPolicy', 
		'type': 'flight'
	}
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
		dataLayer: {
			...tagManagerArgs.dataLayer,
			...objDataLayer
		},
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
    
    console.log("gtmnya => ", window.gtm);
};