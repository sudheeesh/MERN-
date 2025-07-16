export const sendToken=(user,statuscode,res) =>{
    const token = user.getJWTToken()

    //options for cookies
    const options={
        expires:new Date(Date.now()+ Number(process.env.COOKIE_EXPIRE*24*60*60*1000)),
        httpOnly:true
    }
    res.status(statuscode).cookie('token',token,options)
    .json({
        success:true,
        user,
        token
    })
}