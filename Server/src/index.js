const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middle wares
app.use(express.json());
app.use(cors());


//get all currencies
app.get("/getAllCurrencies", async (req, res) => {
    // console.log('Fetching all currencies');
    const url = `https://openexchangerates.org/api/currencies.json?app_id=f26bdccf5a4b4f36908cc267b3d54d7f`;

    try {
        const namesResponse = await axios.get(url);
        const names = namesResponse.data;

        return res.json(names);
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
});

// Route
app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

    const currencyURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=f26bdccf5a4b4f36908cc267b3d54d7f`;
    const namesURl = `https://openexchangerates.org/api/currencies.json?app_id=f26bdccf5a4b4f36908cc267b3d54d7f`;
    try {
        const response = await axios.get(currencyURL);
        const data = response.data;

        // Check the data is valid
        if (!data || response.status !== 200) {
            throw new Error("Unable to fetch exchange rates");
        }

        const rates = data.rates;

        // Check if the entered sourceCurrency and targetCurrency are available
        if (
            !rates.hasOwnProperty(sourceCurrency) ||
            !rates.hasOwnProperty(targetCurrency)
        ) {
            throw new Error(
                "The entered sourceCurrency and targetCurrency are not available"
            );
        }

        //get the names of the currencies
        const namesResponse = await axios.get(namesURl);
        const namesData = namesResponse.data;

        //sourceCurrency name
        const sourceCurrencyName = namesData[sourceCurrency];
        //targetCurrency name
        const targetCurrencyName = namesData[targetCurrency];

        // Perform the conversion
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json({
            amountInTargetCurrency: targetValue,
            sourceCurrencyName,
            targetCurrencyName,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});

//listen to a port
app.listen(5001, () => {
    console.log('Server is running on port 5000');
});
