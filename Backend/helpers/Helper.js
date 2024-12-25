import bcrypt from "bcrypt";

// Hash password function
export const hashpassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};

// Compare password function (added 'await' for async behavior)
export const comparePassword = async (password, hashedpassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedpassword);
    return isMatch;
  } catch (err) {
    console.log(err);
    return false;
  }
};
