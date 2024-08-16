
const catchAsyncError=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next)
        .catch((error)=>next(error))
    }
}


class AppError extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
	}
}



export {
    catchAsyncError,
    AppError
}