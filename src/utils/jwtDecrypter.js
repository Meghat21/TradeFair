// verify a token symmetric - synchronous
var decoded = jwt.verify(token, "shhhhh");
console.log(decoded.foo); // bar

// verify a token symmetric

const decrypter = (token, Secret_Key) => {
  jwt.verify(token, Secret_Key, (err, verifiedJWT) => {
    if (err) {
      console.log(err.message);
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    } else {
      return verifiedJWT;
    }
  });
};
