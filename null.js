import React, { Component } from 'react';
import axios from 'axios';

const ProductContext = React.createContext();

export const ProductConsumer = ProductContext.Consumer;

class ProductProvider extends Component {
    state = { products: [] };

    getProducts = (department_id) => {
            axios.get(`/api/department/${department_id}/products`)
            .then( res => {
                this.setState({ products: res.data })
            })
            .catch( err => {
                console.log(err)
            })
 
    }


addProduct = (department_id, product) => {
    axios.post(`/api/department/${department_id}/products`, {product})
    .then( res => {
        const { products } = this.state
        this.setState({ products: [...products, res.data] })
    })
    .catch( err => {
        console.log(err)
    })
}

updateProduct = (department_id, product) => {
    axios.put(`/api/department/${department_id}/products/${product.id}`, { product } )
    .then( res => {
        const products = this.state.products.map( i => {
            if (i.id === id)
                return res.data
            return i
        })
        this.setState({ products })
    })
    .catch( err => {
        console.log(err)
      })
  }

  deleteProduct = (department_id, id) => {
      axios.delete(`/api/department/${department_id}/products/${id}`)
      .then( res => {
          const { products } = this.state
          this.setState({ products: products.filter( i => i.id !== id) }) 
      })
  }

render() {
    return(
        <ProductContext.Provider value={{
            ...this.state,
            getProducts: this.getProducts,
            addProduct: this.addProduct,
            updateProduct: this.updateProduct,
            deleteProduct: this.deleteProduct
        }}>
        {this.props.children}
        </ProductContext.Provider>
    )
}
}

export default ProductProvider; 



import React, { Component } from 'react';
import axios from 'axios';

const DepartmentContext = React.createContext();

export const DepartmentConsumer = DepartmentContext.Consumer;

class DepartmentProvider extends Component {
    state = { departments: [] }

    componentDidMount(){
        axios.get('/api/departments')
        .then( res => {
            this.setState({ departments: res.data })
        })
        .catch( err => {
            console.log(err)
        })
    }


addDepartment = (department) => {
    axios.post('/api/departments', {department})
    .then( res => {
        const { departments } = this.state
        this.setState({ departments: [...departments, res.data] })
    })
    .catch( err => {
        console.log(err)
    })
}

updateDepartment = (id, department) => {
    axios.put(`/api/departments/${id}`, { department } )
    .then( res => {
        const departments = this.state.departments.map( i => {
            if (i.id === id)
                return res.data
            return i
        })
        this.setState({ departments })
    })
    .catch( err => {
        console.log(err)
      })
  }

  deleteDepartment = (id) => {
      axios.delete(`/api/department/${id}`)
      .then( res => {
          const { departments } = this.state
          this.setState({ department: departments.filter( i => i.id !== id) }) 
      })
  }

render() {
    return(
        <DepartmentContext.Provider value={{
            ...this.state,
            addDepartment: this.addDepartment,
            updateDepartment: this.updateDepartment,
            deleteDepartment: this.deleteDepartment
        }}>
        {this.props.children}
        </DepartmentContext.Provider>
    )
}
}

export default DepartmentProvider;




// /************************************ */
// /************************************ */
// /************************************ */
// /************************************ */
// /************************************ */
// /************************************ */
// /************************************ */
// /************************************ */


import React, { Component } from 'react';
import axios from 'axios';

const ReviewContext = React.createContext();

export const ReviewConsumer = ReviewContext.Consumer;

class ReviewProvider extends Component {
    state = { reviews: [] };

    getReviews = (product_id) => {
            axios.get(`/api/product/${product_id}/reviews`)
            .then( res => {
                this.setState({ reviews: res.data })
            })
            .catch( err => {
                console.log(err)
            })
 
    }


addProduct = (product_id, review) => {
    axios.post(`/api/product/${product_id}/reviews`, {review})
    .then( res => {
        const { reviews } = this.state
        this.setState({ reviews: [...reviews, res.data] })
    })
    .catch( err => {
        console.log(err)
    })
}

updateReview = (product_id, review) => {
    axios.put(`/api/product/${product_id}/reviews/${review.id}`, { review } )
    .then( res => {
        const reviews = this.state.reviews.map( i => {
            if (i.id === id)
                return res.data
            return i
        })
        this.setState({ reviews })
    })
    .catch( err => {
        console.log(err)
      })
  }

  deleteReview = (product_id, id) => {
      axios.delete(`/api/product/${product_id}/reviews/${id}`)
      .then( res => {
          const { reviews } = this.state
          this.setState({ reviews: reviews.filter( i => i.id !== id) }) 
      })
  }

render() {
    return(
        <ReviewContext.Provider value={{
            ...this.state,
            getReviews: this.getReviews,
            addReview: this.addReview,
            updateReview: this.updateReview,
            deleteReview: this.deleteReview
        }}>
        {this.props.children}
        </ReviewContext.Provider>
    )
}
}

export default ReviewProvider; 




import React from 'react';
import { Card } from 'semantic-ui-react';
import ProductConsumer  from '../../providers/ProductProvider';
import ReviewConsumer  from '../../providers/ReviewProvider';

const Product = () => (
<ProductConsumer>
    { value => (
    <Card>
        <Card.Content>
            <img src={value.image_link} />
        </Card.Content>

        <Card.Content>
            <Card.Header> {value.name} </Card.Header>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                Description: {value.description}
            </Card.Meta>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                <p> ${value.price} </p>
            </Card.Meta>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                <p> Stock: {value.stock} </p>
            </Card.Meta>
        </Card.Content>

    </Card>
    )}

</ProductConsumer>

<ReviewConsumer>
    { value => (
    <Card>
        <Card.Content>
            <img src={value.image_link} />
        </Card.Content>

        <Card.Content>
            <Card.Header> {value.title} </Card.Header>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                Body: {value.body}
            </Card.Meta>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                <p> {value.author} </p>
            </Card.Meta>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                <p> Rating: {value.rating} </p>
            </Card.Meta>
        </Card.Content>

        <Card.Content>
            <Card.Meta>  
                <p> Date: {value.date} </p>
            </Card.Meta>
        </Card.Content>

    </Card>
    )}
    </ReviewConsumer>

)


export default Product;