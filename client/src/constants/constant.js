// config.js
const isDevelopment = process.env.NODE_ENV === 'development';

export const BASE_URL = "https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app";

export const AppRoutes = {
  signUp: `${BASE_URL}/user/register`,
  signIn: `${BASE_URL}/user/login`,
  changePassword: `${BASE_URL}/user/password`,
  newAppointment: `${BASE_URL}/newAppointment`,
  loanRequest: `${BASE_URL}/loanRequest`,
  guarantors: `${BASE_URL}/loanRequest/guarantors`,
  userLoans: (userId) => `${BASE_URL}/loanRequest/user/${userId}/loans`,
  userLoanRequest: (id) => `${BASE_URL}/loanRequest/${id}`,
  allApplications: `${BASE_URL}/admin/applications`,
  updateAppointmentDetails: (id) => `${BASE_URL}/admin/applications/${id}`,
  generateNewQrCodeAndToken: (id) => `${BASE_URL}/admin/applications/${id}/token`,
  getMyInfo: `${BASE_URL}/user/myInfo`,
  getAllMember: `${BASE_URL}/familyRoutes`,
  AddAMember: `${BASE_URL}/familyRoutes`,
  DeleteAMember: (id)=>  `${BASE_URL}/familyRoutes/${id}`,
  
  // ✅ Fixed: Use query parameter instead of route parameter
  getAllReports: `${BASE_URL}/fileRoutes`, // We'll append ?familyMemberId=xxx in the component

  // getAllReports: `${BASE_URL}/fileRoutes/reports`,
  uploadReport:  `${BASE_URL}/fileRoutes/upload`
}