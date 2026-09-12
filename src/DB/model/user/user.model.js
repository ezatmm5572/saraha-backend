import mongoose from "mongoose";
import { genderEnum, providerEnum, userRole } from "../../../common/enums/user.enums.js";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return this.provider == providerEnum.google ? false : true
        },
        minLength: 8
    },
    age: Number,
    confirmed: Boolean,
    provider: {
        type: String,
        enum:Object.values(providerEnum),
        default: providerEnum.system
    },
    gender: {
        type: String,
        enum:Object.values(genderEnum),
        default: genderEnum.male
    },
    role: {
        type: String,
        enum: Object.values(userRole),
        default: userRole.user
    }
}, {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true }
})
userSchema.virtual("userName")
    .get(function () {
        return this.firstName + " " + this.lastName
    })
    .set(function (v) {
        const [firstName, lastName] = v.split(" ")
        this.set({ firstName, lastName })
    })


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel