Vue.component('product', {
    props: {
        premium: {            
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" />
        </div>

        <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>User is Premium: {{premium}}</p>
            <p>Shipping: {{shipping}}</p>

            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>

            <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)">
            
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>            
        </div>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reivews yet.</p>

            <ul>
                <li v-for="r in reviews">
                    <p>{{r.name}}</p>
                    <p>Rating: {{r.rating}}</p>
                    <p>{{r.review}}</p>
                </li>
            </ul>
        </div>

        
        <product-review @review-submitted="AddReview"></product-review>
    </div>
    `,
    data(){ 
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
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
            reviews: []
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index){
            this.selectedVariant= index
        },
        AddReview(productReview){
            this.reviews.push(productReview);
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
        },
        shipping(){
            if(this.premium){
                return "Free"
            }else{
                return 2.99
            }
        }
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the errors</b>
                <ul>
                    <li v-for="e in errors">
                        {{e}}
                    </li>
                </ul>
            </p>
            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name" />
            </p>

            <p>
                <label for="review">Review: </label>
                <input id="review" v-model="review" />
            </p>

            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            this.errors=[];
            if(this.name && this.review && this.rating){                
                let productReview={
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview);
                this.review=null;
                this.name=null;
                this.rating=null;
            }else{
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
            }
        }
    }
})

var app= new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
     },
    methods: {
        updateCart(id){
            this.cart.push(id)
        }
    }
})
