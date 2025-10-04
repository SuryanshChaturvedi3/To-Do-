const {Schema,model }= require("mongoose");
const {createHmac, randomBytes}= require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema(
  {
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt :{type:String},
  role :{type:String,
    enum:[
    "USER","ADMIN"],
  default:"USER"
}
},
{ timestamps: true });


/*---------------Save User data---------------*/
userSchema.pre("save",function (next){
       const user = this;
         console.log("🔥 Pre-save hook called for:", user.email);

       if(!user.isModified("password")) return next()
        
     const salt = randomBytes(16).toString("hex"); // 16 bytes random salt
       const hashedPassword = createHmac("sha256", salt)
         .update(user.password) // plain password hash me convert
         .digest("hex");        // hex string me convert


console.log("👉 Before hashing:", user.password);   // plain password
  console.log("👉 After hashing:", hashedPassword);   // hashed password



         user.salt = salt;
         user.password = hashedPassword;
         next();
      });



/*--------------- Compare & Generate Token ---------------*/
userSchema.static("createTokenForUser",async function(email,password) {
  const user = await this.findOne({email});
  if(!user) return false;

const salt = user.salt;
const hashedPassword = user.password;

 const userProvidedPassword = createHmac("sha256", salt)
        .update(password) // login me user ne jo password diya
        .digest("hex");

    if(hashedPassword !== userProvidedPassword) throw new Error("Invalid password"); // mismatch → error
   const token = createTokenForUser(user); // match → JWT generate
    return token;
})


const userModel = model("User", userSchema);

module.exports = userModel;
