/** Service implementation for AdminService */
module.exports = cds.service.impl(function() {
    this.before ( ['CREATE', 'SAVE'], 'Orders', _checkOrderCreateAuth)
  })
  
  
  /** Check authorization  */
  function _checkOrderCreateAuth (req) {
    req.user.is('admin')  || req.reject(403)
  }
