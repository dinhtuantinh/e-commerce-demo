import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, Button } from '@material-ui/core';
import { getAllInter, deleteInter} from '../services/Api';
import { Link } from 'react-router-dom';
import './../css/AllInter.css';

const AllInter = () => {

    const [inter, setInter] = useState([]);
    useEffect(() => {
        getInter();
    }, [])

    const getInter = async () =>{
        const response = await getAllInter();
        setInter(response.data);
    }

    const deleteData = async (id) => {
        await deleteInter(id);
        getInter();
    }

    return (
        <Table className="table">
            <TableHead>
                <TableRow className="thead">
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Desc</TableCell>
                    <TableCell>priceOld</TableCell>
                    <TableCell>priceNew</TableCell>
                    <TableCell>productType</TableCell>
                    <TableCell>bestseller</TableCell>
                    <TableCell>newProduct</TableCell>
                    <TableCell>sale</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                inter.map((item, index) => (
                    <TableRow className="trow" key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.desc}</TableCell>
                        <TableCell>{item.priceOld}</TableCell>
                        <TableCell>{item.priceNew}</TableCell>
                        <TableCell>
                        {
                            (() => {
                                switch (item.productType) {
                                    case 0:
                                        return "Bracelets";
                                    case 1:
                                        return "Necklace";
                                    case 2:
                                        return "Rings";
                                    case 3:
                                        return "Earrings";
                                    case 4:
                                        return "Chains";
                                    case 5:
                                        return "Brooches";
                                    case 6:
                                        return "Hairpins";
                                    default:
                                      return "Khác";
                                }
                            })()
                        }
                        </TableCell>
                        <TableCell>{item.bestseller===0?"Ẩn":item.bestseller===1?"Hiện":"Khác"}</TableCell>
                        <TableCell>{item.newProduct===0?"Ẩn":item.newProduct===1?"Hiện":"Khác"}</TableCell>
                        <TableCell>{item.sale===0?"Ẩn":item.sale===1?"Hiện":"Khác"}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell><img src={item.image}/></TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" className="btn-edit" component={Link} to={`/edit/${item.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteData(item.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
    )
}

export default AllInter;
