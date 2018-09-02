import fetch from 'node-fetch';
import queryString from 'query-string';

const BASE_URL = 'http://appservices.citibikenyc.com';
const PATH_HELMETS = '/v1/helmet/list';
const PATH_BRANCHE = '/v1/branch/list';
const HEADERS = {
  Accept: '*/*',
  Connection: 'close',
  'User-Agent': 'node-citibike/',
};

/**
 * Class for handling communications with Citibike's API.
 */
export default class Citibike {
  private _apiKey: string;

  /**
   * Constructor.
   * 
   * @param {string} the API key for Citibike's API.
   */
  constructor(apiKey?: string) {
    this._apiKey = apiKey;
  }

  /**
   * Issues an HTTP Get request.
   *
   * @param {String}      url         String of the URL to issue the request to.
   * @param {Function}    callback    Callback function that will be called when the processing is done.
   * @param {Object}      params      Object containing query string parameters to issue in the Get request.
   */
  private async get(url: string, callback: Function, params?: object) {
    const qs = queryString.stringify({...{ apiKey: this._apiKey }, ...params });

    return fetch(`${BASE_URL}${url}?${qs}`).then(res => callback(res.json()));
  }

  /**
   * Function for requesting and returning Citibike Branch data in JSON form.
   *
   * @param {Object}      params      Object containing query string parameters to issue in the request.
   * @param {Function}    callback    Callback function that will be called when the processing is done.
   */
  public async getBranches(params: object, callback: Function) {
    return this.get(PATH_BRANCHE, callback, params);
  }

  /**
   * Function for requesting and returning Citibike Helmets data in JSON form.
   *
   * @param {Object}      params      Object containing query string parameters to issue in the request.
   * @param {Function}    callback    Callback function that will be called when the processing is done.
   */
  public async getHelmets(params: object, callback: Function) {
    return this.get(PATH_HELMETS, callback, params);
  }
}
