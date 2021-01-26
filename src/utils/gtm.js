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
		'Keyword' : ' viewAirportPolicy', 
		'destinationStatus' : 'flight',
		'airline': 'click',
		'destinationAirport' : ' viewAirportPolicy', 
		'type' : 'flight'
	}
};

export const initialGTM = () => {
    pushGTM(tagManagerArgs);
};

export const pushGTM = (obj) => {
    window.gtm = window.gtm || {};

    window.gtm = {
        ...window.gtm,
        ...obj,
    };
    
    console.log("gtmnya => ", window.gtm);
}

export const sendEventGTM = (objEvent) => {
    const dataLayer = window.dataLayer;
	dataLayer.push(objEvent);

	const newObj = tagManagerArgs;
	newObj.dataLayer = objEvent;
	
    pushGTM(newObj);
}