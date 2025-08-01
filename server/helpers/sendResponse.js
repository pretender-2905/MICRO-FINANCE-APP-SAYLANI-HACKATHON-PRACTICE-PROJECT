function sendResponse(res, status, data, error, message){
 res.status(status).json({
    error: error,
    data: data,
    message: message
 })
}

export default sendResponse