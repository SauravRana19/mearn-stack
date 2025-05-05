const isAuthenticated = (req, res, next) => {
    const islogin = false
    if(islogin){
        next()
    }else{
        res.send('Unauthorized')
    }
  }

  module.exports = isAuthenticated