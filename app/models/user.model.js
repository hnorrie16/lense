module.exports = mongoose => {
    var userSchema = mongoose.Schema(
        {
            fullname:{
                type: String,
                required: [true, "Full name is required"],
                maxlength: [80, "Maximum name length of 80 characters"]
            },
            role:{
                type: String,
                required: [true, "Role is required"],
                maxlength: [10, "Maximum name length of 10 characters"]
            },
            email:{
                type: String,
                unique: [true, "Email must be unique"],
                required: [true, "Email address is required"],
                maxlength: [100, "Maximum name length of 100 characters"],
                minlength: [5, "Maximum name length of 5 characters"]
            },
            password:{
                type: String,
                required: [true, "Password is required"]
            },
            supplierparent:{
                type: String,
                required: [true, "Role is required"],
                maxlength: [100, "Maximum name length of 10 characters"]
            },supplierchild:{
                type: String,
                required: [true, "Role is required"],
                maxlength: [100, "Maximum name length of 10 characters"]
            },
        },
        { timestamps: true }
    );

    //converts _id object to id
    userSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("users", userSchema);
    return User;
};
