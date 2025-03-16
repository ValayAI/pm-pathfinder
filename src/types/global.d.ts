
interface ConvertKitAPI {
  createSubscriber: (options: { email: string; form: string }) => Promise<any>;
}

interface Window {
  convertkit?: ConvertKitAPI;
}
