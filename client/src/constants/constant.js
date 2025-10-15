const dev_Url = "http://localhost:4000"
const prodUrl = "https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app"

export const BASE_URL = prodUrl

export const AppRoutes = {
    signUp: "user/register",
    signIn: "user/login", 
    changePassword: "user/password",
    newAppointment: "newAppointment",
    loanRequest: "loanRequest",
    guarantors: "loanRequest/guarantors",
    userLoans: "loanRequest/user/:userId/loans",
    userLoanRequest: "loanRequest/:id",
    allApplications: "admin/applications", 
    updateAppointmentDetails: "admin/applications/:id",
    generateNewQrCodeAndToken: "admin/applications/:id/token",
    getMyInfo: "user/myInfo"
}

// Then in your API calls, combine them:
// const url = `${BASE_URL}/${AppRoutes.signIn}`