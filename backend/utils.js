import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user._email,
        isAdmin: user._iisAdmin,
    }, 
    process.env.JWT_SECRET || "amazona-secret", {
        expiresIn: '30d',
    });
};