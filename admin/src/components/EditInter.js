import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button, Select, MenuItem } from '@material-ui/core';
import { editInter, getAllInter } from '../services/Api';
import { useParams, useHistory } from 'react-router-dom';
import './../css/EditInter.css';
import validator from 'validator';

const initialValue = {
    name: "",
    desc:"",
    priceOld:"",
    priceNew:"",
    productType:"",
    bestseller : "",
    newProduct: "",
    sale: "",
    quantity:"",
    image: ""
}

const EditInter = () => {

    const [inter, setInter] = useState(initialValue);
    const {name, desc, priceOld, priceNew, productType, bestseller, newProduct, sale, quantity, image} = inter;
    const [emailError, setEmailError] = useState('');

    const { id } = useParams();

    useEffect(() => {
        loadInterData();
    },[]);

    const loadInterData = async () =>{
        const response = await getAllInter(id);
        setInter(response.data);
    }

    const onImageChange = (e) =>
    {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setInter({ ...inter, image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const history = useHistory();

    const onValueChange = (e) =>
    {
      setInter({...inter, [e.target.name]: e.target.value});
    }

    const editInterDetails = async () =>{
        
            await editInter(id,inter);
            history.push('/all');
       
    }

    return (
        <Container maxWidth="sm">
            <Box my={9}>
            <Typography variant="h5" align="center">Add Product Details</Typography>
            <FormGroup>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="name" value={name} />
                </FormControl>
                <FormControl>
                    <InputLabel>Desc</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="desc" value={desc} />
                </FormControl>
                <FormControl>
                    <InputLabel>priceOld</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="priceOld" value={priceOld} />
                </FormControl>
                <FormControl>
                    <InputLabel>priceNew</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="priceNew" value={priceNew} />
                </FormControl>
                <FormControl>
                    <InputLabel>productType</InputLabel>
                    <Select onChange={(e) => onValueChange(e)} name="productType" value={productType}>
                        <MenuItem value={0}>Bracelets</MenuItem>
                        <MenuItem value={1}>Necklace</MenuItem>
                        <MenuItem value={2}>Rings</MenuItem>
                        <MenuItem value={3}>Earrings</MenuItem>
                        <MenuItem value={4}>Chains</MenuItem>
                        <MenuItem value={5}>Brooches</MenuItem>
                        <MenuItem value={6}>Hairpins</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Bestseller</InputLabel>
                    <Select onChange={(e) => onValueChange(e)} name="bestseller" value={bestseller}>
                        <MenuItem value={0}>Ẩn</MenuItem>
                        <MenuItem value={1}>Hiện</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>New</InputLabel>
                    <Select onChange={(e) => onValueChange(e)} name="newProduct" value={newProduct}>
                        <MenuItem value={0}>Ẩn</MenuItem>
                        <MenuItem value={1}>Hiện</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Sale</InputLabel>
                    <Select onChange={(e) => onValueChange(e)} name="sale" value={sale}>
                        <MenuItem value={0}>Ẩn</MenuItem>
                        <MenuItem value={1}>Hiện</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>quantity</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="quantity" value={quantity} />
                </FormControl>
                <hr></hr>
                <FormControl>
                    <InputLabel>Image</InputLabel>
                    <Input onChange={(e) => onImageChange(e)}  type='file'/>
                    {inter.image && <img src={inter.image} alt="Hình ảnh" />}
                </FormControl>
                <Box my={3}>
                    <Button variant="contained" onClick={() => editInterDetails() } color="primary" align="center">Add Inter</Button>
                    <Button onClick={()=> history.push("/all")} variant="contained" color="secondary" align="center" className='btn-cancel'>Cancel</Button>
                </Box>
            </FormGroup>
            </Box>
        </Container>
    )
}


export default EditInter;