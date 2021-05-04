module.exports = async function(User) {
  console.log(User)
  return await User.findAll();
}