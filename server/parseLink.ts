import { Router } from "express";
import axios from "axios"
import * as cheerio from "cheerio"

const router = Router()

router.post("/", async (req, res) => {
    const { url } = req.body

    if(!url){
        return res.status(400).json({ message: "URl is required"})
    }

    try {
        new URL(url)
    }catch{
        return res.status(400).json({ message: "Invalid URL"})
    }

    try {
        const {data: html } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 WishlistBot"
            },
            timeout: 8000
        })
    const $ =  cheerio.load(html)
    
    const title = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content")

    const description = $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content")

    const image = $('meta[property="og:image"]').attr("content")

    res.json({
        url,
        title,
        description,
        image
    })
    }catch(error){
        res.status(500).json({
        message: "Failed to parse link"
    })
    }
})

export default router