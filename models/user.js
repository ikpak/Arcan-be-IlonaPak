const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const round = 10

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },

    tokens: [String],

    type: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "type is required"],
        default: "user"
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.methods.toJSON = function() {
    const obj = this.toObject()

    delete obj.password
    delete obj.tokens
    delete obj.id

    return obj
}

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({
        _id: this._id
    }, process.env.SECRET, { expiresIn: "7d"})

    this.tokens.push(token)
    await this.save()
    return token
}

userSchema.statics.loginWithEmail = async function(email, password) {
    const user = await this.findOne({ email: email })

    if(!user) {
        throw new Error("user does not exist")
    }

    const match = await bcrypt.compare(password, user.password)
    
    if(match) {
        return user
    }

    throw new Error("the password is incorrect")
}

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, round)
    }

    next()
})

userSchema.statics.findOneOrCreate = async function({ email, name }) {
    let user = await this.findOne({ email })

    if(!user) {
        user = await this.create({
            email: email,
            name: name
        })
    }

    return user
}

module.exports = mongoose.model("User", userSchema)