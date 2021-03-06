const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000 //nếu process.env.PORT  có tồn tại thì lấy process.env.PORT không thì lấy 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");

//ở đây chỉnh lại foler vì mặc định nó chọn views
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Andrew Mead",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Andrew Mead",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help",
		name: "Andrew Mead",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "you must provide an address!    ",
		});
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) =>
    {
        if (error)
        {
            return res.send({
                error
            })
        }
        forecast({ latitude, longtitude }, (error, resut) =>
				{
					console.log(resut)
            if (error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                resut,
                location,
                address: req.query.address
            })
        })
    })

	// res.send({
	//     forecast: 'It is snowing',
	//     location: 'Philadelphia',
	//     address: req.query.address
	// })
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		res.send({
			error: "you must provide a search term  ",
		});
	}
	res.send({
		product: [req.query],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Andrew Mead",
		errorMessage: "Help article not found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Andrew Mead",
		errorMessage: "Page not found.",
	});
});

app.listen(port, () => {
	console.log("Server is up on port "+ port);
});
