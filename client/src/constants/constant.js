import Login from "../pages/Login"

const dev_Url = "http://localhost:4000/"
const prodUrl = ""

export const BASE_URL = dev_Url


export const AppRoutes = {
    signUp: BASE_URL + "user/register",
    signIn: BASE_URL + "user/login",
    changePassword: BASE_URL + "user/password",
    newAppointment: BASE_URL + "newAppointment",  //post
    loanRequest : BASE_URL + "loanRequest",  //post
    guarantors: BASE_URL + "loanRequest/guarantors", //post
    userLoans: BASE_URL + "loanRequest/:userId/loans", //get
    userLoanRequest : BASE_URL + "loanRequest/:id",
    allApplications: BASE_URL + "admin/applications",
    updateAppointmentDetails: BASE_URL + "admin/applications/:id",
    generateNewQrCodeAndToken: BASE_URL + "admin/applications/:id/token",
    getMyInfo : BASE_URL + "user/myInfo"



}