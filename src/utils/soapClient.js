import axios from 'axios';
import { parseString } from 'xml2js';

/**
 * Makes a SOAP request to the specified endpoint with the given action and parameters.
 *
 * @param {string} url - The endpoint URL.
 * @param {string} action - The SOAP action to be called.
 * @param {object} params - The parameters for the SOAP action.
 * @returns {Promise<object>} The parsed SOAP response.
 *
 * Usage:
 *
 * const SITELINK_LOC_CODE = "Demo";
 *
 * const [result, setResult] = useState(null);
 * const [error, setError] = useState(null);
 *
 * const fetchSiteInformation = async () => {
//     const params = {
//       sCorpCode: SITELINK_CORP_CODE,
//       sLocationCode: SITELINK_LOC_CODE,
//       sCorpUserName: SITELINK_CORP_LOGIN,
//       sCorpPassword: SITELINK_CORP_PASS,
//     };

//     try {
//       const response = await makeSoapRequest(SITELINK_URL, 'SiteInformation', params);
//       const siteInformationResult = response['soap:Envelope']['soap:Body'][0]['SiteInformationResponse'][0]['SiteInformationResult'][0];
//       setResult(siteInformationResult);
//     } catch (e) {
//       setError(e.message);
//     }
//   };
 */
const makeSoapRequest = async (url, action, params) => {
	const generateXmlRequest = (action, params) => {
	const paramsXml = Object.keys(params).map(key => {
		return `<${key}>${params[key]}</${key}>`;
	}).join('');

	return `
		<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
		<soap12:Body>
			<${action} xmlns="http://www.smdservers.net/">
			${paramsXml}
			</${action}>
		</soap12:Body>
		</soap12:Envelope>
	`;
	};

	const xmlRequest = generateXmlRequest(action, params);

	try {
	const response = await axios.post(url, xmlRequest, {
		headers: {
		'Content-Type': 'application/soap+xml; charset=utf-8',
		},
	});

	return new Promise((resolve, reject) => {
		parseString(response.data, (err, result) => {
		if (err) {
			reject(`Error parsing response: ${err.message}`);
		} else {
			resolve(result);
		}
		});
	});
	} catch (error) {
	throw new Error(`SOAP request failed: ${error.message}`);
	}
};

export default makeSoapRequest;
