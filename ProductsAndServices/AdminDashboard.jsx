import React, {useState } from "react";
import './admindashboard-css.css';


function AdminDashboard() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    sale_price: '',
    quantity_InStock: '',
    image: '',
    video_image: '',
    category: '',
    type: '',
    ratings: '',
    reviews: '',
    prime: '',
    soldby: '',
    featured: ''
  });


    const setRow1_Ids = (ids) => {
      localStorage.setItem('row1_ids', JSON.stringify(ids));
    };
  
    const setRow2_Ids = (ids) => {
      localStorage.setItem('row2_ids', JSON.stringify(ids));
    };
  
    const setRow3_Ids = (ids) => {
      localStorage.setItem('row3_ids', JSON.stringify(ids));
    };
  
    const setRow4_Ids = (ids) => {
      localStorage.setItem('row4_ids', JSON.stringify(ids));
    };
  
    const setRow5_Ids = (ids) => {
      localStorage.setItem('row5_ids', JSON.stringify(ids));
    };

    const setRow6_Ids = (ids) => {
      localStorage.setItem('row6_ids', JSON.stringify(ids));
    };

   const [formData, setFormData] = useState({row1_ids: '', row2_ids: '', row3_ids: '', row4_ids: '', row5_ids: '', row6_ids: ''});
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setRow1_Ids(formData.row1_ids.split(',').map(Number));
    //   setRow2_Ids(formData.row2_ids.split(',').map(Number));
    //   setRow3_Ids(formData.row3_ids.split(',').map(Number));
    //   setRow4_Ids(formData.row4_ids.split(',').map(Number));
    //   setRow5_Ids(formData.row5_ids.split(',').map(Number));
    //   setRow6_Ids(formData.row6_ids.split(',').map(Number));
    // };
  
// Modified handleSubmit function to call sendIdsToServer
const handleSubmit = (e) => {
  e.preventDefault();
  const row1_ids = formData.row1_ids.split(',').map(Number);
  const row2_ids = formData.row2_ids.split(',').map(Number);
  const row3_ids = formData.row3_ids.split(',').map(Number);
  const row4_ids = formData.row4_ids.split(',').map(Number);
  const row5_ids = formData.row5_ids.split(',').map(Number);
  const row6_ids = formData.row6_ids.split(',').map(Number);

  sendIdsToServer({row1_ids, row2_ids, row3_ids, row4_ids, row5_ids, row6_ids});
};

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendIdsToServer = async (ids) => {
      const response = await fetch('/api/row_ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log(data);
    };
    
    
    const handleChange2 = (e) => {
      setProduct({...product, [e.target.name]: e.target.value });
    };

    const add_product_to_database = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };     

  const deleteProduct = async (id) => {
      const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  };

  const updateProduct = async (id, product) => {
      const response = await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  };

  const getProduct = async (id) => {
      const response = await fetch(`/api/products/${id}`, {
          method: 'GET',
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  };

     return (
      <>
        <form 
        onSubmit={handleSubmit}
        >
          <input name="row1_ids" value={formData.row1_ids} onChange={handleChange} placeholder="row1_ids" />
          <input name="row2_ids" value={formData.row2_ids} onChange={handleChange} placeholder="row2_ids" />
          <input name="row3_ids" value={formData.row3_ids} onChange={handleChange} placeholder="row3_ids" />
          <input name="row4_ids" value={formData.row4_ids} onChange={handleChange} placeholder="row4_ids" />
          <input name="row5_ids" value={formData.row5_ids} onChange={handleChange} placeholder="row5_ids" />
          <input name="row6_ids" value={formData.row6_ids} onChange={handleChange} placeholder="row6_ids" />
          <button type="submit">Submit</button>
        </form>
<br />
<hr />
<br />
        <form action="http://localhost:5000/api/products" method="post" onSubmit={(e) => { e.preventDefault(); add_product_to_database(product); }}>
                 <label htmlFor="name"></label>
                 <input type="text" id="name" name="name" value={product.id} onChange={handleChange2} placeholder="name"/>
                  <label htmlFor="description"></label>
                  <input type="text" id="description" name="description" value={product.description } onChange={handleChange2} placeholder="description"/>
                  <label htmlFor="price"></label>
                  <input type="text" id="price" name="price" value={product.price || '' } onChange={handleChange2} placeholder="price"/>
                  <label htmlFor="sale_price"></label>
                  <input type="text" id="sale_price" name="sale_price" value={product.sale_price || '' } onChange={handleChange2} placeholder="sale_price"/>
                  <label htmlFor="quantity_InStock"></label>
                  <input type="text" id="quantity_InStock" name="quantity_InStock" value={1} onChange={handleChange2} placeholder="name"/>
                  <label htmlFor="image"></label>
                  <input type="text" id="image" name="image" value={product.image} onChange={handleChange2} placeholder="image"/>
                  <label htmlFor="video_image"></label>
                  <input type="text" id="video_image" name="video_image" value={product.video} onChange={handleChange2} placeholder="video_image"/>
                  <label htmlFor="category"></label>
                  <input type="text" id="category" name="category" value={product.category}onChange={handleChange2} placeholder="category"/>
                  <label htmlFor="type"></label>
                  <input type="text" id="type" name="type" value={product.type} onChange={handleChange2} placeholder="type"/>
                  <label htmlFor="ratings"></label>
                  <input type="text" id="ratings" name="ratings" value={product.ratings} onChange={handleChange2} placeholder="ratings"/>
                  <label htmlFor="reviews"></label>
                  <input type="text" id="reviews" name="reviews" value={product.reviews} onChange={handleChange2} placeholder="reviews"/>
                  <label htmlFor="prime"></label>
                  <input type="text" id="prime" name="prime" value={product.prime} onChange={handleChange2} placeholder="prime"/>
                  <label htmlFor="soldby"></label>
                  <input type="text" id="soldby" name="soldby" value={product.soldby} onChange={handleChange2} placeholder="soldby"/>
                  <label htmlFor="featured"></label>
                  <input type="text" id="featured" name="featured" value={product.featured} onChange={handleChange2} placeholder="featured"/>
                  <label htmlFor="add_product_to_database"></label>
                  <input type="submit" value='submit' className="btn"/>

            </form>
        </>
     );
    };
  
export default AdminDashboard;
