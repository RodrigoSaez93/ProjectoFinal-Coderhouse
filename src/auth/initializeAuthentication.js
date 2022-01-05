const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../persistence/UserModel')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

function initializeAuthentication(app) {
  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password })
          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email })
          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          const validate = await user.isValidPassword(password)
          if (!validate) {
            return done(null, false, { message: 'Wrong password' })
          }

          return done(null, user.toObject(), { message: 'Logged in Succesfully' })
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      done(err, user.toObject())
    })
  })
  app.use(passport.initialize())
  app.use(passport.session())

  console.log('Authentication initialized')
}

module.exports = initializeAuthentication
