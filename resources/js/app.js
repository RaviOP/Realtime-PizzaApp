import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

let updateCart = (pizza) => {
    axios.post('/update-cart', pizza).then((res) => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            progressBar: false,
            timeout: 500,
            text: 'Item Added To Cart',
            type: 'success',
            layout: 'topRight'
        }).show()
    }).catch(err => {
        new Noty({
            progressBar: false,
            timeout: 500,
            text: 'SomeThing Went Wrong',
            type: 'error',
            layout: 'topRight'
        }).show()
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let pizza = JSON.parse(btn.dataset.pizza)
        console.log(pizza)
        updateCart(pizza)
    })
})