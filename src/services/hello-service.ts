import { HelloGqlClient } from './gclient/hello-client';

export class HelloService {

  private _client;

  constructor() {
    this._client = new HelloGqlClient({
      endPoint: process.env.NEXT_PUBLIC_API_SERVER_URL + '/hello',
      token: undefined
    }); 
  }

  getHello = async (mesasge: string) => {
    try {
      const result: any = await this._client.getHello(mesasge);
      if ( result.errors ) {
        throw new Error(`Server Error :${result.errors.message}`);
      }
      return result.getHello;
    } catch ( error ) {
      throw new Error(`Failed to call getHello api :${error}`);
    }
  }
}

export default new HelloService();