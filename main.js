
var comp= new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        brand: 'Vue Mastery',
        // image: './assets/vmSocks-green.jpg',
        inventory: 100,
        selectedVariant: 0,
        details: ['80% cotton', '20% polyster', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart(){
            this.cart +=1
        },
        updateProduct(index){
            this.selectedVariant= index
        }
    },
    computed: {
        title(){
            return this.brand+' '+this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})