import React, {useState, useEffect} from "react";
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";

function TestComp() {
    // Initialize state for storing costs data
    const [costs, setCosts] = useState([]);

    // Fetch costs data from local storage when the component mounts
    useEffect(() => {
        const storedCosts = localStorage.getItem("costs");
        if (storedCosts) {
            setCosts(JSON.parse(storedCosts));
        }
    }, []);

    // Save costs data to local storage when it updates
    useEffect(() => {
        localStorage.setItem("costs", JSON.stringify(costs));
    }, [costs]);

    // Function for adding a new cost item
    const addCost = (event) => {
        event.preventDefault();
        const form = event.target;
        const cost = {
            name: form.elements.name.value,
            amount: form.elements.amount.value,
            category: form.elements.category.value,
            isEdit: false
        };
        setCosts([...costs, cost]);
        form.reset();
    };

    // Function for deleting a cost item
    const deleteCost = (index) => {
        setCosts(costs.filter((_, i) => i !== index));
    };

    // Function for editing a cost item
    const editCost = (index) => {
        console.log(costs[index])
        setCosts(costs.map((cost, i) => (i === index ? {...cost, isEdit: !cost.isEdit} : cost)));
    };

    const handleChange = (index, name, event) => {
        setCosts(costs.map((cost, i) => (i === index ? {...cost, [name]: event.target.value} : cost)));
    }

    const rowByStatus = (index, costs, prop, type) => {
        console.log(costs[index].isEdit);
        if(costs[index].isEdit) {
            return <TextField
                value={costs[index][prop]}
                onChange={(e) => handleChange(index, prop, e)}
                type={type}
            />
        } else {
            return costs[index][prop]
        }
    }

    return (
        <div className="App">
            <h1>Costs Manager</h1>
            <form onSubmit={addCost}>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    id="name"
                    name="name"
                    style={{margin: "10px"}}
                />
                <TextField
                    label="Amount"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    id="amount"
                    name="amount"
                    style={{margin: "10px"}}
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    margin="normal"
                    id="category"
                    name="category"
                    style={{margin: "10px"}}
                />
                <Button variant="contained" color="primary" type="submit" style={{margin: "20px"}}>
                    Add Cost
                </Button>
            </form>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {costs.map((cost, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {rowByStatus(index, costs, "name")}
                            </TableCell>
                            <TableCell>
                                {rowByStatus(index, costs, "amount", "number")}
                            </TableCell>
                            <TableCell>
                                {rowByStatus(index, costs, "category")}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => deleteCost(index)}>Delete</Button>
                                <Button onClick={() => editCost(index, cost)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TestComp;