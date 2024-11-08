// Add your custom JavaScript for checkout here.
import loadCheckDoc from '../check-group'
loadCheckDoc()

window.ecomPassport.on('login', () => {
    console.log(window.ecomPassport.checkLogin()) // true
    loadCheckDoc()
})