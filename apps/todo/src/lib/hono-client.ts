import { API_URL } from "$env/static/private";
import { hcWithType } from '@meadow/api/hc';
const client = hcWithType(API_URL);
export default client;
