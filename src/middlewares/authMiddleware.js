import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(req, res, next){
    // console.log(req.authorization);
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer ')){
        res.status(403).json({
            message: 'Invalid Authorization Token or please login again'
        });
        res.end();
        return;
    }

    const authArr = auth.split(' ');
    const token = authArr[1];

    try {
        const decodeValue = jwt.verify(token, JWT_SECRET);

        // console.log(decodeValue);

        if( decodeValue.email && decodeValue.username && decodeValue.userId){
            req.email = decodeValue.email;
            req.username = decodeValue.username;
            req._id = decodeValue.userId;
            next();
        }
        else{
            return res.status(401).json({
                message: 'Invalid Authorisation Token'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Something gone wrong. Please check auth token or login again'
        });
        return;
    }
}