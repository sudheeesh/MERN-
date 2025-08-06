export const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    const isProduction = process.env.NODE_ENV === 'production';

    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: isProduction, // send cookie only on HTTPS
        sameSite: isProduction ? 'None' : 'Lax', // allow cross-site in production
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            user,
            token
        });
};
