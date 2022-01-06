let instance = null

class ConfigController{


    /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  get(req,res){
      const config={
          db_mongo: process.env.DB_MONGO,
          token_secret:process.env.TOKEN_SECRET,
          sender_email:process.env.SENDER_EMAIL,
          sender_password:process.env.SENDER_PASSWORD,
          session_duration:process.env.SESSION_DURATION,
          port:process.env.PORT
      }
      res.json(config)
  }
    static getInstance() {
        if (instance == null) {
          instance = new ConfigController()
        }
    
        return instance
      }
}

module.exports=ConfigController