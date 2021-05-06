module.exports = async function() {
  let userByPk = await luuserModel.findByPk(1, {
    attributes: ['fName', 'lName', 'email', 'username']
  })
  return(userByPk);
}