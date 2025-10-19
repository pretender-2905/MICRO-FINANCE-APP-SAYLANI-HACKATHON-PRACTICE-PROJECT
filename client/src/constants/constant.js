// config.js
const isDevelopment = process.env.NODE_ENV === 'development';

export const BASE_URL = "https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app";

export const AppRoutes = {
  signUp: `${BASE_URL}/user/register`,
  signIn: `${BASE_URL}/user/login`,
  getAllMember: `${BASE_URL}/familyRoutes`,
  AddAMember: `${BASE_URL}/familyRoutes`,
  DeleteAMember: (id)=>  `${BASE_URL}/familyRoutes/${id}`,
  getAllReports: `${BASE_URL}/fileRoutes`,  
  uploadReport:  `${BASE_URL}/fileRoutes/upload`
}