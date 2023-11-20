import express from 'express';
import config from 'config';
import {engine} from 'express-handlebars';
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY'), // defaults to process.env["OPENAI_API_KEY"]
});

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.urlencoded({extended: true}))

app.get('/', (_, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    const size = req.body.size ?? '1024x1024';

    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            size,
            n: 1, // DALL·E 3 supports only 1 image per request
        });

        // Extracting image URLs from the response
        const imageUrls = response.data.data.map(img => img.url);
        console.log(imageUrls); // Log the image URLs

        res.render('index', {
            images: imageUrls, // Pass the URLs to the template
        });
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.render('index', {
            error: e.message,
        });
    }
});


app.listen(3000, () => console.log('Server started...'))